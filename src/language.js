const fs = require('fs');
const path = require('path');
const Gettext = require('node-gettext');
const {po} = require('gettext-parser');
const franc = require('franc');
const LangLocator = require('./locator/lang');

/**
  * Class to handle translations and i18n
  */
module.exports = class Language
{
  constructor(locale = '', locales = [], languages = [], pathOptions = {})
  {
    this.locale = locale;
    this.locales = locales;
    this.languages = languages;
    this.pathOptions = pathOptions;
    this.domain = 'messages';
    this.gt = new Gettext();
  }

  /**
    * Load all translations into memory
    */
  loadTranslations()
  {
    return Promise.all( this.locales.map(locale => {
      return new Promise( (resolve, reject) => {
        // Locate translation file
        let locator = new LangLocator(this.domain, Object.assign({
          targetDir: locale,
          exts: ['po']
        }, this.pathOptions));
        // Load and parse
        fs.readFile(locator.path, 'utf8', (err, translationsFile) => {
          let trans = po.parse(translationsFile);
          this.gt.addTranslations(locale, this.domain, trans);
          resolve();
        });
      });
    })).then(() => {
      this.gt.setLocale(this.locale);
    });
  }

  /**
    * Get translation for message ID
    */
  trans(msgid)
  {
    return this.gt.gettext(msgid);
  }

  /**
    * Detect language when unknown utterance
    */
  detectLang(msg)
  {
    return franc.all(msg, {whitelist: this.languages});
  }
}
