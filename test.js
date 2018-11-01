// Core
const LowBot = require('./src/index');

// Classifier
const IntentClassification = require('eduir');

// Adapters
const alexa = require('lowbot-alexa');
const discord = require('lowbot-discord');
const slack = require('lowbot-slack');
const terminal = require('lowbot-terminal');

// Skills
const intents = require('./build/intents.json').intents;
const BasicSkill = require('./src/skills/basic/index');

// Bot instance
let botInstance = new LowBot()
  .applyClassifier(IntentClassification, intents)
  // .useAdapter(alexa)
  .useAdapter(discord)
  // .useAdapter(slack)
  // .useAdapter(terminal)
  .addSkill(BasicSkill) // Add our only skill at the moment
  .enableDataService() // Allow skills to use the data service specified in .env
  .enablePodService() // Allow skills to use the pod service specified in .env
  .init(); // Initialise bot instance (wake up)
