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
                    resolve('<speak><s>Hiya</s></speak>');
                break;
            }
        });
    }
};

module.exports = Basic;
