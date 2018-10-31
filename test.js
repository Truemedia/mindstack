const IntentClassification = require('eduir');
const LowBot = require('./src/index');
const alexa = require('./src/adapters/alexa');
const discord = require('./src/adapters/discord');
const terminal = require('./src/adapters/terminal');
const intents = require('./build/intents.json').intents;
const BasicSkill = require('./src/skills/basic/index');

let botInstance = new LowBot(intents, IntentClassification)
  // .useAdapter(alexa)
  // .useAdapter(terminal)
  .useAdapter(discord)
  .addSkill(BasicSkill) // Add our only skill at the moment
  .init(); // Initialise bot instance (wake up)
