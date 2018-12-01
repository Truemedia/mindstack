module.exports = class UnprocessableSkillResponseError extends Error {
  constructor (message = 'Skill response not formatted properly, object returned does not match schema', status) {
    super(message);
    this.code = 'LOWBOT_UNPROCESSABLE_SKILL_RESPONSE';
    Error.captureStackTrace(this, this.constructor);
    this.status = status || 422;
  }
};
