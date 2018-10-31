/**
  * Terminal adapter
  * @namespace adapter
  * @prop {object} info
  */
module.exports = {
  /**
    * Descriptive information about adapter
    * @namespace info
    * @prop {String} name - Name of adapter used as context for bot
    */
  info: {
    name: 'terminal'
  },
  /**
    * Client configuration
    * @namespace client
    * @prop {Slack} instance - API class instance
    * @prop {Object} methods - Login method used to invoke authentication
    */
  client: {},
  /**
    * Input configuration
    * @namespace input
    * @prop {String} detector - Library used to detect intent of msg
    * @prop {String} parser - Library used to parse information from msg
    */
  input: {
    detector: 'eduir', // Educated intent recogniser
    parser: 'intent-desire' // Reverse BDI lookup
  },
  /**
    * Output configuration
    * @namespace output
    * @param {String} format - File format for outputting content
    * @param {String} target - Type of client that handles response
    */
  output: {
    format: 'md', // Markdown
    target: 'terminal' // Terminal only
  },
  /**
    * Variable configuration
    * @namespace vars
    * @param {String} token - Token used to authenticate
    */
  vars: {}
};
