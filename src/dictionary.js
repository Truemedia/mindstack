const lexes = require('auto-plug')({ prefix: 'lex', pattern: ['*-lex'] });
const changeCase = require('change-case');

module.exports = class Dictionary
{
  /**
    * Compile lexicon libraries needed by skills into text files usable by system
    */
  static compile(skillInfos)
  {
    return Promise.all( skillInfos.map(info => {
      let {lexicons} = info;
      if (Object.entries(lexicons).length > 0) { // Import lexicons as text files
        Object.entries(lexicons).map(intent => {
          let [intentName, lexDeps] = intent;
          lexDeps.map(lex => changeCase.camelCase(lex))
            .map( lexicon => {
              if (Object.keys(lexes).includes(lexicon)) {
                let lexName = changeCase.paramCase(lexicon).replace('-lex', '');
                lexes[lexicon].toFile(`build/txt/${lexName}.txt`);
              }
            });
        });
      }
    }));
  }
};
