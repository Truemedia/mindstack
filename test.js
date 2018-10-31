const IntentClassification = require('eduir');
const LowBot = require('./src/index');
const alexa = require('./src/adapters/alexa');
const discord = require('./src/adapters/discord');
const terminal = require('./src/adapters/terminal');
const intents = require('./build/intents.json').intents;
const BasicSkill = require('./src/skills/basic/index');
const skills = [BasicSkill];

let botInstance = new LowBot({
    // alexa,
    discord,
    // terminal
}, intents, IntentClassification, skills).init();
