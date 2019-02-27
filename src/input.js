const Intent = require('./intent'); // TODO: Load from rapid intent builder
const UnresolvableUtteranceError = require('./errors/UnresolvableUtterance');

/**
  * Handle input of messages, and parse into a format the bot can understand
  */
module.exports = class Input
{
  constructor(classifiers, intents, opts)
  {
    this.intents = JSON.parse( JSON.stringify(intents) );
    this.intentClassifier = new classifiers.intent(intents, opts.score.min).classifier;
    this.desireClassifier = classifiers.desire;
  }

  detect(msg)
  {
    return this.meaning(msg.content).then( (understanding) => {
      console.log('Intent from RASA', understanding);
      return this.handlerInput(msg, understanding.intentName);
    });
  }

  /**
    * Derive meaning from intent classifier
    */
  meaning(txt)
  {
    return this.intentClassifier.classify(txt);
  }

  handlerInput(msg, intentName)
  {
    let intentContent = this.intents.find(intent => intent.intentName == intentName);
    if (intentContent == null) throw new UnresolvableUtteranceError();
    let intent = new Intent(intentName, intentContent.utterances);

    let inputData = new this.desireClassifier(intent.samples, msg.content).input;
    let {author, channel} = msg;
    let session = {author, channel};
    let request = {intent, inputData, session};
    let requestEnvelope = {request};
    return {requestEnvelope};
  }
}
