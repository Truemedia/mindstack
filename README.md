# Mind Stack
A powerful and flexible bot framework for building bots without restrictions

## Introduction
Read the [docs](https://github.com/Truemedia/mindstack/wiki/Docs), have a look at our [examples](https://github.com/Truemedia/mindstack-examples), or see the list of [repositories](#repositories) that power this project.

Why choose between coding and configuration when you can have both. Configure your services ([discord](https://discordapp.com/), [slack](https://slack.com/), [etc](#adapters)), and code your logic.

This framework provides structuring and guidelines to allow the user to write there own use cases with tools they need readily available.

THIS IS AN ONGOING PROJECT, DOCUMENTATION WILL BE UPDATED AS THE PROJECT PROGRESSES

## Getting started
You can take a look at our [docker box](https://github.com/Truemedia/brain-box) or [CLI tool](https://github.com/Truemedia/mindstack-cli). Otherwise you will need the following setup and ready to go, then your ready for installation:
- [NodeJs](https://nodejs.org/en/) (>= 10)
- [RabbitMQ server](https://www.rabbitmq.com/download.html)
- Data service (JAM stack such as [Gatsby](https://www.gatsbyjs.org/) or [Gridsome](https://gridsome.org/))
- Developer account, relevant to the adapters your using (see specific [adapter repos](#adapters) for links)

## Installation
Create a new git repository for your bot instance and setup a node project using `npm init` inside the repo.

Now create an empty file called **bot.js** and install Mind Stack:

NPM
```bash
    npm i -S mindstack
```

Yarn
```bash
    yarn add mindstack
```

Now you need to make sure you have a [RabbitMQ server](https://www.rabbitmq.com/install-debian.html) setup with a queue/exchange called `mindstack`:

Fresh install (Ubuntu)
```bash
  apt-get install rabbitmq-server
  service rabbitmq-server start
  rabbitmq-plugins enable rabbitmq_management
  rabbitmqadmin declare queue name=mindstack durable=false
```

Only creating the queue (Preexisting RabbitMQ install)
```bash
  rabbitmqadmin declare queue name=mindstack durable=false
```


## Usage
Node (bot.js)
```js
    const MindStack = require('mindstack');

    let botInstance = new MindStack();
```

Command line
```bash
  node bot.js
```

See [docs](https://github.com/Truemedia/mindstack/wiki/Docs) for giving your bot functionality and features

## Repositories
There are several repositories used to add functionality or work with Mind Stack. They are listed categorically below (send a request if you want to add your own repositories)

### Adapters
* [Alexa](https://www.npmjs.com/package/mindstack-alexa) - Alexa adapter for Mind Stack
* [Discord](https://www.npmjs.com/package/mindstack-discord) - Discord adapter for Mind Stack
* [Mail](https://www.npmjs.com/package/mindstack-mail) - Mail adapter for Mind Stack
* [Slack](https://www.npmjs.com/package/mindstack-slack) - Slack adapter for Mind Stack
* [Terminal](https://www.npmjs.com/package/mindstack-terminal) - Terminal adapter for Mind Stack
### Bot instance
* [Mind Stack](https://github.com/Truemedia/mindstack) - A powerful and flexible bot framework for building bots without restrictions
### Data services
* [Data bite](https://www.npmjs.com/package/data-bite) - ES6 simplified class for consuming data from an external service
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
* [Mind Stack CLI](https://github.com/Truemedia/mindstack-cli) - CLI tool for Mind Stack
* [Rapid Intent Builder](https://github.com/Truemedia/rapid-intent-builder) - Rapid intent builder for quick prototyping/development of complex bots

### Skillsets
- [Basic skillset](https://www.npmjs.com/package/basic-skillset) - A basic skillset for a bot that can say hello and goodbye in many different ways
- [Store skillset](https://github.com/Truemedia/store-skillset) - Sell products and services, ecommerce using natural language
### Transformers
* [Sanitize mail](https://www.npmjs.com/package/sanitize-mail) - A sanitize-html wrapper optimised for sanitising HTML for email clients
* [Strip mentions](https://www.npmjs.com/package/strip-mentions) - Strip \@mentions from a string using a default or custom handle style
* [Turndown SSML](https://www.npmjs.com/package/turndown-ssml) - A Turndown plugin to convert SSML into markdown files
* [Verbose Utterance](https://www.npmjs.com/package/verbose-utterance) - Interprete/compile \*.utter files for creating a verbose library of utterances
### Virtual machines
* [Brain box](https://github.com/Truemedia/brain-box) - Docker machine for running Mind Stack instance
