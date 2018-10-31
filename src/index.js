require('module-alias/register');
require('dotenv').config();
const Input = require('./input');
const Output = require('./output');
const Logger = require('./logger');
// const Client = require('./client');
const defaults = require('@config/settings.json');

module.exports = class LowBot
{
    /**
      * Create a new bot instance
      */
    constructor(adapters = {}, intents = {}, IntentClassifier, skills = [], opts = {})
    {
        this.opts = Object.assign(defaults, opts);
        this.adapters = adapters;
        this.input = new Input(IntentClassifier, intents, this.opts.classifier);
        this.skills = skills;

        // Set output and client handlers for each adapter
        this.outputter = {}
        this.clients = {};
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
        this.input.detect(msg).then( (handlerInput) => {
            console.log('Matched intent', handlerInput.requestEnvelope.request.intent);
            let matchedSkill = this.skills.find(skill => skill.canHandle(handlerInput));
            return (matchedSkill) ? matchedSkill.handle(handlerInput) : null;
        }).then( (content) => {
          console.log('content', content);
            return this.outputter[adapter].format(content);
        }).then( (res) => {
            return msg.reply(res);
        }).then( (msg) => {
            Logger.info(`${msg.author.username} replied to a mention`);
        });
    }

    /**
      * Initialise a new instance
      */
    init()
    {
      Object.entries(this.adapters).map( (adapter) => {
          let [name, settings] = adapter;
          this.outputter[name] = new Output(settings);
          let token = this.conf(name).token;

          let clientOptions = (settings.client.methods.login == 'constructor') ? {token} : {}

          this.clients[name] = new settings.client.instance(clientOptions);
          this.clients[name].on('ready', () => {
              let botName = this.clients[name].user.tag;
              Logger.success(`Bot awakened, logged in as ${botName}!`);
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
      * Add an adapter for a service
      */
    addAdapter(adapter)
    {
      this.adapters.push(adapter);
    }

    /**
      * Add a skill
      */
    addSkill(skill)
    {
      this.skills.push(skill);
    }
}
