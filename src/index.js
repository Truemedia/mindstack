require('dotenv').config();
const signale = require('signale');
const Input = require('./input');
const Output = require('./output');
// const Client = require('./client');

module.exports = class LowBot
{
    /**
      * Create a new bot instance
      */
    constructor(adapters = {}, intents = {}, IntentClassifier, skills = [], opts = {})
    {
        this.opts = Object.assign(this.defaults, opts);
        this.adapters = adapters;
        this.input = new Input(IntentClassifier, intents, this.opts);
        this.skills = skills;

        // Set output and client handlers for each adapter
        this.outputter = {}
        this.clients = {};
        Object.entries(this.adapters).map( (adapter) => {
            let [name, settings] = adapter;
            this.outputter[name] = new Output(settings);
            let token = this.conf(name).token;

            let clientOptions = (settings.client.methods.login == 'constructor') ? {token} : {}

            this.clients[name] = new settings.client.instance(clientOptions);
            this.clients[name].on('ready', () => {
                let botName = this.clients[name].user.tag;
                signale.success(`Bot awakened, logged in as ${botName}!`);
                this.clients[name].on('message', (msg) => {
                    // Bot mentioned in chat
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
      * Default options for bot instance
      */
    get defaults()
    {
        return {
            defaultAdapter: 'terminal', minScore: 0.75
        };
    }

    conf(adapter = null)
    {
        let mappings = this.adapters[adapter || this.opts.defaultAdapter].vars;
        let conf = {};
        Object.entries(mappings).map( (mapping) => {
            let [confKey, envKey] = mapping;
            conf[confKey] = process.env[envKey];
        });
        return conf;
    }

    /**
      * Detect intent from text and provide contxt
      */
    input(txt)
    {
        return this.classifier.classify(txt);
    }

    /**
      * Response to message
      */
    respond(msg, adapter)
    {
        this.input.detect(msg).then( (handlerInput) => {
            let matchedSkill = this.skills.find(skill => skill.canHandle(handlerInput));
            return (matchedSkill) ? matchedSkill.handle(handlerInput) : null;
        }).then( (tmpl) => {
            return this.outputter[adapter].format(tmpl);
        }).then( (content) => {
            return msg.reply(content);
        }).then( (msg) => {
            signale.info(`${msg.author.username} replied to a mention`);
        });
    }
}
