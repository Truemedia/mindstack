const Discord = require('discord.js');

module.exports = {
    client: {
        instance: Discord.Client,
        methods: {
            login: 'login'
        }
    },
    input: {
        parser: 'molir'
    },
    output: {
        format: 'md',
        target: 'browser'
    },
    vars: {
        token: 'DISCORD_TOKEN'
    }
};
