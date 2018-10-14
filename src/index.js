require('dotenv').config();
const signale = require('signale');
const Discord = require('discord.js');
const Output = require('./output');

module.exports = class LowBot
{
    /**
      * Create a new bot instance
      */
    constructor(adapters = {}, intents = {}, IntentClassifier, defaultAdapter = 'terminal', minScore = 0.75)
    {
        this.adapters = adapters;
        this.classifier = new IntentClassifier(intents, minScore);
        this.defaultAdapter = defaultAdapter;

        // Set output handler for each adapter
        this.outputter = {}
        Object.entries(this.adapters).map( (adapter) => {
            let [name, settings] = adapter;
            this.outputter[name] = new Output(settings);
        });

        // TODO: Abstract clients
        let exampleAdapter = 'discord';
        this.client = new Discord.Client();
        this.client.on('ready', () => {
            signale.success(`Bot awakened, logged in as ${this.client.user.tag}!`);
            this.client.on('message', (msg) => {
                // Bot mentioned in chat
                if (msg.mentions.users.keyArray().includes(this.client.user.id)) {
                    this.respond(msg, exampleAdapter);
                }
            });
        });
        this.client.login(this.conf(exampleAdapter).token);
    }

    loadAdapter(adapter, lib)
    {
        if (!this.adapter.hasOwnProperty(adapter)) {
            this.adapters[adapter] = lib
        }
    }

    conf(adapter = null)
    {
        let mappings = this.adapters[adapter || this.defaultAdapter].vars;
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
