module.exports = class UnresolvableIntentError extends Error {
  constructor (message = 'No skill to handle intent', status) {
    super(message);
    this.code = 'LOWBOT_UNRESOLVABLE_INTENT';
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 500;
  }
};
