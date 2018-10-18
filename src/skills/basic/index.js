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

            switch (request.intent.name) {
                case 'greeting': // Greeting
                    let arrivalSalutation = 'Hello';
                    resolve( saluteTpl({arrivalSalutation}) );
                break;
                case 'farewell': // Farewell
                    let departureSalutation = 'Goodbye';
                    resolve( saluteTpl({departureSalutation}) );
                break;
            }
        });
    }
};

module.exports = Basic;
