const IntentClassifier = require('molir/molir');
const LowBot = require('./src/index');
const discord = require('./src/adapters/discord');
const terminal = require('./src/adapters/terminal');
const intents = require('./build/intents.json').intents;

let botInstance = new LowBot({discord, terminal}, intents, IntentClassifier);
botInstance.respond('hello', 'terminal');
