const IntentClassifier = require('molir/molir');
const LowBot = require('./src/index');
const discord = require('./src/adapters/discord');
const intents = require('./build/intents.json').intents;

let botInstance = new LowBot({discord}, intents, IntentClassifier);
botInstance.respond('hello');
