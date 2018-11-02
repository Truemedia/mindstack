const TurndownService = require('turndown');
const turndownSsmlPlugin = require('turndown-ssml');
const marked = require('marked');
const TerminalRenderer = require('marked-terminal');
const showdown = require('showdown');
const sanitizeMail = require('sanitize-mail');

marked.setOptions({ renderer: new TerminalRenderer() });

class Output {
  constructor(opts = {}) {
    this.settings = opts;
    this.turndownService = new TurndownService();
    this.turndownService.use(turndownSsmlPlugin.ssml);
    this.showdownService = new showdown.Converter();
  }

  /**
    * Transform content into specified format
    */
  format(content) {
    let transform = null;

    /**
      * Handle format (content assumed SSML)
      */
    switch (this.settings.format) {
      case 'md': // Markdown
        // TODO: Remove this dirty hack once fixed in turndown repo
        let breakSymbols = turndownSsmlPlugin.defaults.breakSymbols;
        transform = this.turndownService.turndown(content)
          .replace(` ${breakSymbols.comma}`, `${breakSymbols.comma} `)
          .replace(` ${breakSymbols.ellipsis}`, `${breakSymbols.ellipsis} `);
      break;
      case 'html': // Hyper Text Markup Language
        transform = this.showdownService.makeHtml(
          this.turndownService.turndown(content)
        );
      break;
      case 'txt': // Basic text

      break;
      default: // Speech Synthesis Markup language
        return content;
      break;
    }

    /**
      * Handle target
      */
    if (this.settings.format == 'md' && this.settings.target == 'terminal') {
      transform = marked(transform);
    }
    if (this.settings.format == 'html' && this.settings.target == 'mailbox') {
      transform = sanitizeMail(transform);
    }

    return transform;
  }
}


module.exports = Output;
