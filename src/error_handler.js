class ErrorHandler
{
  constructor(err)
  {
    this.err = err;
  }

  handle(Logger, msg)
  {
    console.log(this.err);
    switch (this.err.code) {
      /**
        * Payment errors
        */
      case 'PAYMENT_LACK_OF_FUNDS':
        msg.reply('Sorry, you don\'t have enough for that');
        Logger.error(error.message);
      break;
      /**
        * Lowbot errors
        */
      case 'LOWBOT_UNPROCESSABLE_SKILL_RESPONSE':
        msg.reply('It looks like my skill for this is broken slightly, please try again later');
        Logger.error(error.message);
      break;
      case 'LOWBOT_UNRESOLVABLE_INTENT':
        msg.reply('I understand your intent but I don\'t have a skill to handle that');
        Logger.error(error.message);
      break;
      /**
        * Service errors
        */
      case 'ECONNREFUSED':
        msg.reply('It looks like the data service I need is down');
        Logger.error('Data service is down, make sure endpoint is available');
      break;
      /**
        * Generic errors
        */
      default:
        msg.reply(`Something went wrong with my programming I'm not sure what though`);
        Logger.crit('Unhandled error', err);
        console.error(err);
      break;
    }
  }
}

module.exports = ErrorHandler;
