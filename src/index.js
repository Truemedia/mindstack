require('dotenv').config();

module.exports = class LowBot
{
    /**
      * Create a new bot instance
      */
    constructor(adapters = {}, defaultAdapter = 'console')
    {
        this.adapters = adapters;
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
      * Output content
      */
    output(content, channel = 'general', adapter)
    {
        console.log(this.conf(adapter));
    }
}
