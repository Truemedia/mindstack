const transformer = require('jstransformer');
const TplLocator = require('./locator/tpl');
const defaultCompiler = require('jstransformer-handlebars');

/**
  * Compose templates using multiple formatters with smart defaults
  */
module.exports = class Template
{
  /**
    * @param pathOptions {object} - Path options used for generating paths to template files
    * @param gt {function} - Gettext instance
    * @param compiler {function} - JStransformer compatible transformer
    * @param engineOptions {object} - Apply functions, settings, and handlers on the template compiler
    */
  constructor(pathOptions = {}, gt = null, compiler = null, engineOptions = {})
  {
    this.pathOptions = pathOptions;
    this.gt = gt;
    this.compiler = compiler || defaultCompiler;
    this.engineOptions = {...this.defaultEngineOptions, ...engineOptions};
  }

  /**
    * Set compiler instance
    * @param compiler {function} - JStransformer compatible transformer
    */
  set compiler(compiler)
  {
    this.renderer = transformer(compiler);
  }

  /**
    * Set template (name oftemplate to be used)
    * @param templateName {string} - Base name of template file (excluding markup suffix)
    */
  set template(templateName)
  {
    this.locator = new TplLocator(templateName, Object.assign({
      exts: this.renderer.inputFormats
    }, this.pathOptions));
  }

  /**
    * Set content (template data)
    */
  set content(data)
  {
    this.data = data;
  }

  /**
    * Default options for current compiler
    * @returns {Object}
    */
  get defaultEngineOptions()
  {
    let opts;

    switch (this.renderer.name) { // TODO: Abstract for more engines (handlebars only currently)
      case 'handlebars':
        opts = {
          decorators: {},
          helpers: {
            // Locale/Language
            '_': (msgid) => {
              return this.gt.gettext(msgid);
            },
            'ngettext': (msgid, plural, count) => {
              return this.gt.ngettext(msgid, plural, count);
            }
          },
          partials: {}
        };
      break;
      default:
        opts = {};
      break;
    }

    return opts;
  }

  /**
    * Set template with content
    * @param template {string} - Base name of template file (excluding markup suffix)
    * @param content {object} - Templating content variables
    * @returns {this}
    */
  tpl(template, content = {})
  {
    this.template = template;
    this.content = content;
    return this;
  }

  /**
    * Compile a template into expected output format
    * @returns {Promise}
    */
  compile() {
    return this.renderer.renderFileAsync(this.locator.path, {...this.data, ...this.engineOptions});
  }
}
