const mime = require('mime');
const cons = require('consolidate');

/**
  * Handle templating resources and compilers
  */
module.exports = class Template
{
  constructor(templateName, data, pathOptions = {}, engineOptions = {})
  {
    this.templateName = templateName;
    this.engineOptions = {...this.defaultEngineOptions, ...engineOptions};
    this.pathOptions = {...this.defaultPathOptions, ...pathOptions};
    this.data = data;
  }

  get defaultEngineOptions()
  {
    return {
      cache: true
    };
  }

  get defaultPathOptions()
  {
    return {
      cwd: './',
      skillDir: 'skillsets',
      srcDir: 'src',
      tplDir: 'tpl',
      tarDir: 'speech',
      ext: 'hbs',
      extPrefix: 'ssml'
    };
  }

  get templatePath()
  {
    let {cwd, skillDir, srcDir, tplDir, tarDir, ext, extPrefix} = this.pathOptions;
    return `${cwd}/${skillDir}/${srcDir}/${tplDir}/${tarDir}/${this.templateName}.${extPrefix}.${ext}`;
  }

  get type()
  {
    return mime.getType(this.pathOptions.ext);
  }

  /**
    * @returns {Promise}
    */
  compile() {
    let engine = 'handlebars'; // Default

    switch (this.type)
    {
      case 'text/x-handlebars-template': // Handlebars
        engine = 'handlebars';
      break;
      // TODO: Add more or find detection library
    }

    return cons[engine](this.templatePath, {...this.data, ...this.engineOptions});
  }
}
