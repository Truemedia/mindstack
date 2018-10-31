/**
  * Alexa adapter
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
    name: 'alexa'
  },
  /**
    * Client configuration
    * @namespace client
    * @prop {Alexa} instance - API class instance
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
    detector: null, // Done by the framework
    parser: null // Done by the framework
  },
  /**
    * Output configuration
    * @namespace output
    * @param {String} format - File format for outputting content
    * @param {String} target - Type of client that handles response
    */
  output: {
    format: { // Simultaneous output
      display: 'apl', // Alexa presentation language
      speech: 'ssml' // Speech synthesis markup language
    },
    target: 'device' // Hardware only
  },
  /**
    * Variable configuration
    * @namespace vars
    * @param {String} token - Token used to authenticate
    */
  vars: {}
};
