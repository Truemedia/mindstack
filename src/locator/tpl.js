const Locator = require('./../locator');

module.exports = class TplLocator extends Locator
{
  constructor(baseName, pathOptions)
  {
    super(baseName, pathOptions);
  }

  get defaultPathOptions()
  {
    return {
      srcDir: 'src',
      assetDir: 'tpl',
      targetDir: this.defaultTargetDirectory,
      extPrefix: this.defaultTemplatePrefix
    };
  }

  /**
    * Voice-first application
    * @return String
    */
  get defaultTargetDirectory()
  {
    return 'speech'; // TODO: Read from config
  }

  /**
    * Prefix (used to specify markup language)
    * @return String
    */
  get defaultTemplatePrefix()
  {
    return 'ssml'; // TODO: Read from config
  }
}
