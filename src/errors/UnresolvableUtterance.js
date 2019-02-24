module.exports = class UnresolvableUtteranceError extends Error {
  constructor (message = 'No intent found for utterance. Skill is either not loaded or more learning data needed', status) {
    super(message);
    this.code = 'LOWBOT_UNRESOLVABLE_UTTERANCE';
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 500;
  }
};
