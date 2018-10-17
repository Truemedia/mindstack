// Templates
const greetTpl = require('@compiled/basic/templates/speech/greet.ssml');

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
            let request = handlerInput.requestEnvelope.request;

            switch (request.intent.name) {
                default:
                    let greeting = 'Hello world';
                    resolve( greetTpl({greeting}) );
                break;
            }
        });
    }
};

module.exports = Basic;
