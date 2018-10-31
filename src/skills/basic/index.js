// Templates
const saluteTpl = require('@compiled/basic/templates/speech/salute.ssml');
const parting = require('parting');
const greeting = require('greeting');

// TODO: Flesh out
const Basic = {
    /**
      * Check if skill is compatable with current intent
      */
    canHandle(handlerInput)
    {
        let request = handlerInput.requestEnvelope.request;

        let capable = false;
        switch (request.intent.name) {
            case 'greeting':
            case 'news':
                capable = true;
            break;
        }

        return capable;
    },

    /**
      * Handle input from intent
      */
    handle(handlerInput)
    {
      return new Promise( (resolve, reject) => {
        let {request} = handlerInput.requestEnvelope;

        switch (request.intent.name) {
          /**
            * Salutations
            */
          case 'greeting': // Greeting
            let arrivalSalutation = greeting.random();
            resolve( saluteTpl({arrivalSalutation}) );
          break;
          case 'farewell': // Farewell
            let departureSalutation = parting.random();
            resolve( saluteTpl({departureSalutation}) );
          break;
          /**
            * Date and time
            */
          // case 'time': // Current time
          //   let time = null;
          //   resolve( dateTpl({time}) );
          // break;
          // case 'day': // Current day
          //   let day = null;
          //   resolve( dateTpl({day}) );
          // break;
          /**
            * Status
            */
          // case 'status': // Well-being
          //   let status = null;
          //   resolve( statusTpl({status}) );
          // break;
          // case 'sleep':
          //   let status = null;
          //   resolve( statusTpl({status}) );
          // break;
        }
      });
    }
};

module.exports = Basic;
