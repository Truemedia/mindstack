const IntentClassification = require('eduir');
const LowBot = require('./src/index');
const alexa = require('./src/adapters/alexa');
const discord = require('./src/adapters/discord');
const terminal = require('./src/adapters/terminal');
const intents = require('./build/intents.json').intents;
const BasicSkill = require('./src/skills/basic/index');

let botInstance = new LowBot()
  .applyClassifier(IntentClassification, intents)
  .useAdapter(discord)
  // .useAdapter(alexa)
  // .useAdapter(terminal)
  .addSkill(BasicSkill) // Add our only skill at the moment
  .enableDataService() // Allow skills to use the data service specified in .env
  .enablePodService() // Allow skills to use the pod service specified in .env
  .init(); // Initialise bot instance (wake up)
