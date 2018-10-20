const Intent = require('./intent'); // TODO: Load from rapid intent builder

module.exports = class Input
{
    constructor(classification, intents, opts)
    {
        this.classifier = new classification(intents, opts.score.min).classifier;
        this.intents = intents;
    }

    detect(msg)
    {
        return this.matchIntent( msg.content.toString() ).then( (intent) => {
            return this.handlerInput(msg, intent.intentName);
        });
    }

    matchIntent(txt)
    {
        return this.classifier.classify(txt);
    }

    handlerInput(msg, intentName)
    {
        let inputData = null; // TODO: Add code for this
        let {author, channel} = msg;
        let session = {author, channel};
        let request = {intent: new Intent(intentName), inputData, session};
        let requestEnvelope = {request};
        return {requestEnvelope};
    }
}
