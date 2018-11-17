require('module-alias/register');
require('dotenv').config();
const fs = require('fs');
const gulp = require('gulp');
const gulpPlugins = require('auto-plug')('gulp');
const YAML = require('yaml');
const build = YAML.parse( fs.readFileSync('./build.yml', 'utf8') );

const Dictionary = require('./dictionary');
const Input = require('./input');
const Logger = require('./logger');
const Output = require('./output');
const Persona = require('./persona');
// const Client = require('./client');
const defaults = require('@config/settings.json');

module.exports = class LowBot
{
    /**
      * Create a new bot instance
      */
    constructor(opts = {})
    {
        this.opts = Object.assign(defaults, opts);
        this.input = null;
        this.adapters = {};
        this.skills = [];

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
        let mappings = this.adapters[adapter || this.opts.adapter.default].vars;
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
            return (matchedSkill) ? matchedSkill.handle(handlerInput) : null;
        }).then( (content) => { // Format content returned  from skill
            return this.outputter[adapter].format(content);
        }).then( (res) => { // Send content
            return msg.reply(res);
        }).then( (msg) => { // Log
            Logger.info(`${msg.author.username} replied to a mention`);
        }).catch(err => {
          switch (err.code) {
            case 'ECONNREFUSED':
              msg.reply('It looks like the data service I need is down');
              Logger.error('Data service is down, make sure endpoint is available');
            break;
            default:
              msg.reply(`Something went wrong with my programming I'm not sure what though`);
              Logger.crit('Unhandled error', err);
            break;
          }
        });
    }

    /**
      * Build/compile files
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
      Object.entries(this.adapters).map( (adapter) => { // Wake up adapters
        let [name, settings] = adapter;
        this.outputter[name] = new Output(settings.output);
        let token = this.conf(name).token;

        let clientOptions = (settings.client.methods.login == 'constructor') ? {token} : {}

        this.clients[name] = new settings.client.instance(clientOptions);
        this.clients[name].on('ready', () => {
          this.persona.sync(this.clients[name]);
          let botName = this.clients[name].user.tag;
          Logger.success(`Bot awakened, logged in on service '${name}' as bot '${botName}'`);
          this.clients[name].on('message', (msg) => { // Bot mentioned in chat
            if (msg.mentions.users.keyArray().includes(this.clients[name].user.id)) {
              this.respond(msg, name);
            }
          });
        });
        if (settings.client.methods.login != null && settings.client.methods.login != 'constructor') {
          this.clients[name][settings.client.methods.login](token);
        }
      });
    }

    /**
      * Apply classifier for adapters that require the availability of one
      */
    applyClassifier(classifier, intents)
    {
      this.input = new Input(classifier, intents, this.opts.classifier);
      return this;
    }

    /**
      * Use adapter passed as available service
      */
    useAdapter(adapter)
    {
      this.adapters[adapter.name] = adapter;
      return this;
    }

    /**
      * Add a skill
      */
    addSkill(skill)
    {
      this.skills.push(skill);
      return this;
    }

    /**
      * Enable data service
      */
    enableDataService()
    {
      this.dataService = true;
      return this;
    }

    /**
      * Enable pod service
      */
    enablePodService()
    {
      this.podService = true;
      return this;
    }

    /**
      * Configure personality inheritance
      */
    personaInherit(character = 'default', characters = [], inherit = true, switchable = false)
    {
      this.persona = new Persona(character, characters, {inherit, switchable});
      return this;
    }
}
