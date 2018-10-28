require('module-alias/register');
const randomItem = require('random-item');
const Data = require('@data');

// Templates
const saluteTpl = require('@compiled/basic/templates/speech/salute.ssml');

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
            case 'farewell':
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
            let service = new Data().service();

            switch (request.intent.name) {
                case 'greeting': // Greeting
                  service.get('salutation', {
                    filter: {tags: 'ArrivalSalutation'}
                  }).then( (res) => {
                    let arrivalSalutation = randomItem(res.data).name;
                    resolve( saluteTpl({arrivalSalutation}) );
                  });
                break;
                case 'farewell': // Farewell
                  service.get('salutation', {
                    filter: {tags: 'DepartureSalutation'}
                  }).then( (res) => {
                    let departureSalutation = randomItem(res.data).name;
                    resolve( saluteTpl({departureSalutation}) );
                  });
                break;
            }
        });
    }
};

module.exports = Basic;
