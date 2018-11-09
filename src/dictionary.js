const lexes = require('auto-plug')({ prefix: 'lex', pattern: ['*-lex'] });
const changeCase = require('change-case');

module.exports = class Dictionary
{
  constructor(skillInfos, locales = [])
  {
      this.locales = locales;

      // Build up list of used lexicons
      this.lexes = [];

      skillInfos.map(info => {
        let {lexicons} = info;
        Object.entries(lexicons).map(intent => {
          let [intentName, lexDeps] = intent;
          lexDeps.map(lex => changeCase.camelCase(lex))
            .map( lexicon => {
              if (!this.lexes.includes(lexicon)) {
                this.lexes.push(lexicon);
              }
            });
        });
      });
  }

  /**
    * Compile lexicon libraries needed by skills into text files usable by system
    */
  compile()
  {
    return Promise.all( this.lexes.map( lexicon => {
      if (Object.keys(lexes).includes(lexicon)) {
        let lexName = lexicon.replace('Lex', '').toLowerCase();
        return Promise.all( this.locales.map(locale => {
          return new lexes[lexicon](locale).toFile(`build/txt/${lexName}/${locale}.txt`);
        }));
      }
    }));
  }
};
