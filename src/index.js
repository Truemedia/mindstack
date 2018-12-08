require('module-alias/register');
require('dotenv').config();
const fs = require('fs');
const gulp = require('gulp');
const gulpPlugins = require('auto-plug')('gulp');
const YAML = require('yaml');
const build = YAML.parse( fs.readFileSync('./build.yml', 'utf8') );

const Dictionary = require('./dictionary');
const ErrorHandler = require('./error_handler');
const Input = require('./input');
const KnowledgeBase = require('./knowledge_base');
const Logger = require('./logger');
const Output = require('./output');
const Persona = require('./persona');
// const Client = require('./client');
const defaults = require('@config/settings.json');
// Errors
const UnprocessableSkillResponseError = require('./errors/UnprocessableSkillResponse');
const UnresolvableIntentError = require('./errors/UnresolvableIntent');
// const Nlu = require('./input/nlu');
// const {Writable} = require('stream');
const Queue = require('./queue');

module.exports = class LowBot
{
    /**
      * Create a new bot instance
      */
    constructor(intents, opts = {})
    {
        this.opts = Object.assign(defaults, opts);
        this.input = null;
        this.adapters = [];
        this.skills = [];
        this.intents = intents;
        this.classifiers = {
          desire: null, intent: null
        };
        this.paymentProviders = [];

        // Set output and client handlers for each adapter
        this.outputter = {}
        this.clients = {};

        // Services
        this.dataService = false;
        this.podService = false;

        // Persona
        this.persona = null;
    }

    conf(adapter = null)
    {
        let name = adapter || this.opts.adapter.default;
        let mappings = this.adapters.find(adapter => (adapter.info.name == name)).vars;
        let conf = {};
        Object.entries(mappings).map( (mapping) => {
            let [confKey, envKey] = mapping;
            conf[confKey] = process.env[envKey];
        });
        return conf;
    }

    /**
      * Response to message
      */
    respond(msg, adapter)
    {
        this.input.detect(msg).then( (handlerInput) => { // Detect intent and trigger skill
          console.log('Matched intent', handlerInput.requestEnvelope.request.intent);
          let matchedSkill = this.skills.find(skill => skill.canHandle(handlerInput));
          if (matchedSkill == undefined) throw new UnresolvableIntentError();

          return matchedSkill.handle(handlerInput);
        }).then( (content) => { // Format content returned from the skill
          // TODO: Replace with schema validation and move into output class
          if (typeof content == 'string') {
            return this.outputter[adapter].format(content);
          } else {
            throw new UnprocessableSkillResponseError();
          }
        }).then( (res) => { // Send content
          return this.clients[adapter].channels.get(msg.channel.id).send(res);
        }).then( (msg) => { // Log
          Logger.info(`${msg.author.username} replied to a mention`);
        }).catch(err => new ErrorHandler(err).handle(Logger, msg));
    }

    /**
      * Build/compile files
      * @return {Promise}
      */
    build(mode = true)
    {
      if (mode) {
        switch (mode) {
          default:
            return Promise.all([
              new Dictionary(this.skills.map(skill => skill.info), this.opts.locales).compile() // Compile lexicons to files
                .then((lexFolders) => {
                  lexFolders.map(localeFiles => {
                    localeFiles.map(localeFile => Logger.info(localeFile));
                  });
                }),
              new Promise( (resolve, reject) => {
                let {templates} = build.src;
                gulp.src([
                    templates.partials.speech, templates.partials.display
                  ].concat(templates.skills.display, templates.skills.speech))
                  .pipe( gulpPlugins.precompileHandlebars({noEscape: true}) )
                  .pipe( gulpPlugins.rename({ extname: '.js' }) )
                  .pipe( gulpPlugins.defineModule('node') )
                  .pipe( gulp.dest(build.dest.templates) )
                  .on('end', () => {
                    Logger.info('Template files compiled');
                    resolve();
                  });
              })
            ]).then(() => {
              return this;
            });
          break;
        }
      } else {
        return new Promise( (resolve, reject) => {
          resolve(this);
        });
      }
    }

    /**
      * Initialise a new instance
      */
    init()
    {
      // var ws = new Writable;
      // ws._write = function (chunk, enc, next) {
      //     console.log(chunk.toString('utf8'));
      //     next();
      // };
      this.input = new Input(this.classifiers, this.intents, this.opts.classifier);

      let queue = new Queue();
      this.adapters.map( (adapter) => { // Wake up adapters
        let name = adapter.info.name;

        Logger.info(`Loading adapter: ${name}`);
        this.outputter[name] = new Output(adapter.output);
        let token = this.conf(name).token;
        let clientOptions = (adapter.client.methods.login == 'constructor') ? {token} : {}

        this.clients[name] = new adapter.client.instance(clientOptions);

        this.clients[name].on('ready', () => {
          this.persona.sync(this.clients[name]);
          let botName = this.clients[name].user.tag;
          Logger.success(`Bot awakened, logged in on service '${name}' as bot '${botName}'`);
          // let rs = new Nlu(ws);
          this.clients[name].on('message', function(msg) { queue.send(msg); });
        });

        // Handle message queue
        queue.on('req', (msg) => {
          console.log('gunna respond');
          new KnowledgeBase(adapter, msg.author).learn(); // Learn about user

          if (msg.mentions.includes(this.clients[name].user.id)) { // Bot mentioned in chat
            this.respond(msg, name);
          }
        });

        if (adapter.client.methods.login != null && adapter.client.methods.login != 'constructor') {
          this.clients[name][adapter.client.methods.login](token);
        }

      });
      queue.watch();
    }

    /**
      * Apply desire classifier for adapters that require the availability of one
      * (Gather input data from matched intent)
      * @return {this}
      */
    applyDesireClassifier(desireClassifier)
    {
      this.classifiers.desire = desireClassifier;
      return this;
    }

    /**
      * Apply intent classifier for adapters that require the availability of one
      * (Match intent based on input message)
      * @return {this}
      */
    applyIntentClassifier(intentClassifier)
    {
      this.classifiers.intent = intentClassifier;
      return this;
    }

    /**
      * Use adapter passed as available service
      * @return {this}
      */
    useAdapter(adapter)
    {
      this.adapters.push(adapter);
      return this;
    }

    /**
      * Add a skill
      * @return {this}
      */
    addSkill(skill)
    {
      this.skills.push(skill);
      return this;
    }

    /**
      * Enable data service
      * @return {this}
      */
    enableDataService()
    {
      this.dataService = true;
      return this;
    }

    /**
      * Enable pod service
      * @return {this}
      */
    enablePodService()
    {
      this.podService = true;
      return this;
    }

    /**
      * Add a payment provider
      * @return {this}
      */
    addPaymentProvider(paymentProvider)
    {
      this.paymentProviders.push(paymentProvider);
      return this;
    }

    /**
      * Configure personality inheritance
      * @return {this}
      */
    personaInherit(character = 'default', characters = [], inherit = true, switchable = false)
    {
      this.persona = new Persona(character, characters, {inherit, switchable});
      return this;
    }
}
