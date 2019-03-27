const Persona = require('./persona');

class Bot
{
  /**
    * Create a new bot instance
    */
  constructor()
  {
    this.adapters = [];
    this.classifiers = {
      desire: null, intent: null
    };
    this.paymentProviders = [];
    this.persona = null;
    this.skills = [];

    // Services
    this.dataService = false;
    this.podService = false;
  }

  /**
    * Apply desire classifier for adapters that require the availability of one
    * (Gather input data from matched intent)
    * @return {this}
    */
  applyDesireClassifier(desireClassifier)
  {
    this.classifiers.desire = desireClassifier;
    return this;
  }

  /**
    * Apply intent classifier for adapters that require the availability of one
    * (Match intent based on input message)
    * @return {this}
    */
  applyIntentClassifier(intentClassifier)
  {
    this.classifiers.intent = intentClassifier;
    return this;
  }

  /**
    * Use adapter passed as available service
    * @return {this}
    */
  useAdapter(adapter)
  {
    this.adapters.push(adapter);
    return this;
  }

  /**
    * Add a skill
    * @return {this}
    */
  addSkill(skill)
  {
    this.skills.push(skill);
    return this;
  }

  /**
    * Enable data service
    * @return {this}
    */
  enableDataService()
  {
    this.dataService = true;
    return this;
  }

  /**
    * Enable pod service
    * @return {this}
    */
  enablePodService()
  {
    this.podService = true;
    return this;
  }

  /**
    * Add a payment provider
    * @return {this}
    */
  addPaymentProvider(paymentProvider)
  {
    this.paymentProviders.push(paymentProvider);
    return this;
  }

  /**
    * Configure personality inheritance
    * @return {this}
    */
  personaInherit(character = 'default', characters = [], inherit = true, switchable = false)
  {
    this.persona = new Persona(character, characters, {inherit, switchable});
    return this;
  }
}

module.exports = Bot;
