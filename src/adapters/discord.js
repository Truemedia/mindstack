const Discord = require('discord.js');

/**
  * Discord adapter
  * @namespace adapter
  * @prop {object} info
  * @prop {object} client
  * @prop {object} input
  * @prop {object} output
  * @prop {object} vars
  */
module.exports = {
  /**
    * Descriptive information about adapter
    * @namespace info
    * @prop {String} name - Name of adapter used as context for bot
    */
  info: {
    name: 'discord'
  },
  /**
    * Client configuration
    * @namespace client
    * @prop {Slack} instance - API class instance
    * @prop {Object} methods - Login method used to invoke authentication
    */
  client: {
    instance: Discord.Client,
    methods: {
      login: 'login'
    }
  },
  /**
    * Input configuration
    * @namespace input
    * @prop {String} detector - Library used to detect intent of msg
    * @prop {String} parser - Library used to parse information from msg
    */
  input: {
    detector: 'eduir', // Educated intent recogniser
    parser: 'intent-desire' // BDI reverse lookup
  },
  /**
    * Output configuration
    * @namespace output
    * @param {String} format - File format for outputting content
    * @param {String} target - Type of client that handles response
    */
  output: {
    format: 'md', // Markdown
    target: 'browser' // Browser only
  },
  /**
    * Variable configuration
    * @namespace vars
    * @param {String} token - Token used to authenticate
    */
  vars: {
    token: 'DISCORD_TOKEN'
  }
};
