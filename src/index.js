require('dotenv').config();

const discord = require('./adapters/discord');
const adapters = {discord};

module.exports = class LowBot
{
    /**
      * Create a new bot instance
      */
    constructor(defaultAdapter = 'console', activeAdapters = [])
    {
        this.activeAdapters = activeAdapters;
        if (!this.activeAdapters.includes(defaultAdapter)) {
            this.activeAdapters.push(defaultAdapter);
        }
        this.defaultAdapter = defaultAdapter;
    }

    conf(adapter = null)
    {
        let mappings = adapters[adapter || this.defaultAdapter].vars;
        let conf = {};
        Object.entries(mappings).map( (mapping) => {
            let [confKey, envKey] = mapping;
            conf[confKey] = process.env[envKey];
        });
        return conf;
    }

    /**
      * Output content
      */
    output(content, channel = 'general', adapter)
    {
        console.log(this.conf(adapter));
    }
}
