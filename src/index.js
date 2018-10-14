require('dotenv').config();
const Output = require('./output');

module.exports = class LowBot
{
    /**
      * Create a new bot instance
      */
    constructor(adapters = {}, intents = {}, IntentClassifier, defaultAdapter = 'console', minScore = 0.75)
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
      * Output content
      */
    output(res, channel = 'general', adapter)
    {
        console.log(this.conf(adapter));
        console.log(res);
    }

    /**
      * Response to message
      */
    respond(msg, adapter)
    {
        let intent = this.input(msg).then( (result) => {
            let ssml = '<speak><s>Hey</s></speak>'; // TODO: Load skill handler here
            let res = this.outputter[adapter].format(ssml);
            this.output(res, 'general', 'discord');
        });
    }
}
