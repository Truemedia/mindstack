# Lowbot
A low implementation framework for building bots without restrictions

## Introduction
Read the [docs](https://github.com/Truemedia/lowbot/wiki/Docs), have a look at our [examples](https://github.com/Truemedia/lowbot-examples), or see the list of [repositories](#repositories) that power this project.

Why choose between coding and configuration when you can have both. Configure your services (discord, slack, etc), and code your logic.

This framework provides structuring and guidelines to allow the user to write there own use cases with tools they need readily available.

THIS IS AN ONGOING PROJECT, DOCUMENTATION WILL BE UPDATED AS THE PROJECT PROGRESSES

## Getting started
You will need the following setup and ready to go, then your ready for installation:
- [NodeJs](https://nodejs.org/en/) (>= 10)
- [RabbitMQ server](https://www.rabbitmq.com/download.html)
- Data service (see [lowbot-data](https://github.com/Truemedia/lowbot-data) as example)
- Developer account, relevant to the adapters your using (see specific [adapter repos](#adapters) for links)

## Installation
Create a new git repository for your bot instance and setup a node project using `npm init` inside the repo.

Now create an empty file called **bot.js** and install lowbot:

NPM
```bash
    npm i -S lowbot
```

Yarn
```bash
    yarn add lowbot
```

## Usage
Node (bot.js)
```js
    const LowBot = require('lowbot');

    let botInstance = new LowBot();
```

Command line
```bash
  node bot.js
```

See [docs](https://github.com/Truemedia/lowbot/wiki/Docs) for giving your bot functionality and features

## Repositories
There are several repositories used to add functionality or work with lowbot. They are listed categorically below (send a request if you want to add your own repositories)

### Adapters
* [Alexa](https://www.npmjs.com/package/lowbot-alexa) - Alexa adapter for lowbot
* [Discord](https://www.npmjs.com/package/lowbot-discord) - Discord adapter for lowbot
* [Mail](https://www.npmjs.com/package/lowbot-mail) - Mail adapter for lowbot
* [Slack](https://www.npmjs.com/package/lowbot-slack) - Slack adapter for lowbot
* [Terminal](https://www.npmjs.com/package/lowbot-terminal) - Terminal adapter for lowbot
### Bot instance
* [Lowbot](https://github.com/Truemedia/lowbot) - A low implementation framework for building bots without restrictions
### Data services
* [Data bite](https://www.npmjs.com/package/data-bite) - ES6 simplified class for consuming data from an external service
* [Lowbot data](https://github.com/Truemedia/lowbot-data) - A data as service implementation compatible with lowbot
### Frameworks
* [High tech](https://github.com/Truemedia/hightech) - A framework for building skills/applications for bleeding edge tech devices
### Lexicon
* [Lemme Lex](https://www.npmjs.com/package/lemme-lex) - A library for creating dictionaries that can be utilised by NLP tools
* [Consent lex](https://www.npmjs.com/package/consent-lex) - A lexicon for giving or declining consent (yes and no)
* [Salutation lex](https://www.npmjs.com/package/salutation-lex) - A lexicon for arrival and departure salutations
### Payment
- [Payment provider](https://www.npmjs.com/package/payment-provider) - Abstraction class for handling payments from multiple providers using common methods
- [VC PP](https://github.com/Truemedia/vc-pp) - Virtual currency payment provider
- [Alexa PP](https://github.com/Truemedia/alexa-pp) - Alexa Payment provider
### Recognisers
* [Eduir](https://www.npmjs.com/package/eduir) - Educated intent recogniser
* [Molir CLI](https://www.npmjs.com/package/molir-cli) - Molir (A.k.a Most Likely/Obvious Intent Recogniser) command line tool
### Scaffolding
* [Rapid Intent Builder](https://github.com/Truemedia/rapid-intent-builder) - Rapid intent builder for quick prototyping/development of complex bots
- [Skillset generator]() - Generate boilerplate code for developing a skillset
### Skillsets
- [Basic skillset](https://www.npmjs.com/package/basic-skillset) - A basic skill for lowbot that can say hello and goodbye in many different ways
- [Store skillset](https://github.com/Truemedia/store-skillset) - Sell products and services, ecommerce using natural language
### Transformers
* [Sanitize mail](https://www.npmjs.com/package/sanitize-mail) - A sanitize-html wrapper optimised for sanitising HTML for email clients
* [Strip mentions](https://www.npmjs.com/package/strip-mentions) - Strip \@mentions from a string using a default or custom handle style
* [Turndown SSML](https://www.npmjs.com/package/turndown-ssml) - A Turndown plugin to convert SSML into markdown files
* [Verbose Utterance](https://www.npmjs.com/package/verbose-utterance) - Interprete/compile \*.utter files for creating a verbose library of utterances

## Developing skillsets
You can generate the boilerplate code for a skill using our [Skillset generator]()
