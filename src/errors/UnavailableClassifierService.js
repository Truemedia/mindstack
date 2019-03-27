module.exports = class UnavailableClassifierServiceError extends Error {
  constructor (message = 'RASA NLU pipeline is offline, try starting or restarting that service (cmd: mindstack pipeline nlu)', status) {
    super(message);
    this.code = 'MINDSTACK_UNAVAILABLE_CLASSIFIER_SERVICE';
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 503;
  }
};
