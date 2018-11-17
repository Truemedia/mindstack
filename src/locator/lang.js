const Locator = require('./../locator');

module.exports = class LangLocator extends Locator
{
  constructor(baseName, pathOptions)
  {
    super(baseName, pathOptions);
  }

  get defaultPathOptions()
  {
    return {
      srcDir: 'src',
      assetDir: 'locales',
      targetDir: this.defaultTargetDirectory,
      extPrefix: this.defaultTemplatePrefix
    };
  }

  /**
    * English first application
    * @return String
    */
  get defaultTargetDirectory()
  {
    return 'en_GB'; // TODO: Read from config
  }
}
