require('dotenv').config();
const signale = require('signale');
const Output = require('./output');
// const Client = require('./client');

module.exports = class LowBot
{
    /**
      * Create a new bot instance
      */
    constructor(adapters = {}, intents = {}, IntentClassifier, opts = {})
    {
        this.opts = Object.assign(this.defaults, opts);
        this.adapters = adapters;
        this.classifier = new IntentClassifier(intents, this.opts.minScore);

        // Set output and client handlers for each adapter
        this.outputter = {}
        this.clients = {};
        Object.entries(this.adapters).map( (adapter) => {
            let [name, settings] = adapter;
            this.outputter[name] = new Output(settings);

            this.clients[name] = new settings.client.instance();
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
            this.clients[name].login(this.conf(name).token);
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

    loadAdapter(adapter, lib)
    {
        if (!this.adapter.hasOwnProperty(adapter)) {
            this.adapters[adapter] = lib
        }
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
        this.input( msg.content.toString() ).then( (result) => {
            let ssml = '<speak><s>Hey</s></speak>'; // TODO: Load skill handler here
            return this.outputter[adapter].format(ssml);
        }).then( (content) => {
            return msg.reply(content);
        }).then( (msg) => {
            signale.info(`${msg.author.username} replied to a mention`);
        });
    }
}
