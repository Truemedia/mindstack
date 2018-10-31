const Slack = require('slack');

/**
  * Slack adapter
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
    name: 'slack'
  },
  /**
    * Client configuration
    * @namespace client
    * @prop {Slack} instance - API class instance
    * @prop {Object} methods - Login method used to invoke authentication
    */
  client: {
    instance: Slack,
    methods: {
      login: null // Login on instance initialisation
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
    * @param {String} clientId - Public key of client (organisation) relevant to
    * @param {String} clientSecret - Private key of client (organisation) relevant to
    */
  vars: {
    token: 'SLACK_BOT_TOKEN', // Token
    clientId: 'SLACK_CLIENT_ID', // Client ID
    clientSecret: 'SLACK_CLIENT_SECRET' // Client secret
  }
};
