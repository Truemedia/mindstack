# Lowbot
A low implementation framework for building bots without restrictions

Why choose between coding and configuration when you can have both. Configure your services (discord, slack, etc), and code your logic.

This framework provides structuring and guidelines to allow the user to write there own use cases with tools they need readily available.

THIS IS AN ONGOING PROJECT, DOCUMENTATION WILL BE UPDATED AS THE PROJECT PROGRESSES

# Building intents model
To generate the intents model you will need to install (Rapid intent builder)[https://github.com/Truemedia/rapid-intent-builder]

Once you have that installed run the following command inside your bot directory:

```bash
  rapid-intent-builder --l=src/skills/**/kb/en_GB/*.txt --u=src/skills/**/kb/en_GB/*.utter
```
