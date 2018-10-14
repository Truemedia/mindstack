const LowBot = require('./src/index');
const discord = require('./src/adapters/discord');

let botInstance = new LowBot({discord});
botInstance.output('hello', 'general', 'discord');
