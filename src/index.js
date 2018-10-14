require('dotenv').config();

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
    output(ssml, channel = 'general', adapter)
    {
        console.log(this.conf(adapter));
        // TODO: Output format
    }

    /**
      * Response to message
      */
    respond(msg)
    {
        let intent = this.input(msg).then( (result) => {
            let ssml = '<speak><s>Hey</s></speak>'; // TODO: Load skill handler here
            this.output(ssml, 'general', 'discord');
        });
    }
}
