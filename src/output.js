const TurndownService = require('turndown');
const turndownSsmlPlugin = require('turndown-ssml');
const marked = require('marked');
const TerminalRenderer = require('marked-terminal');

marked.setOptions({ renderer: new TerminalRenderer() });

class Output {
    constructor(adapter) {
        this.adapter = adapter;
        this.turndownService = new TurndownService();

        this.turndownService.use(turndownSsmlPlugin.ssml);
    }
    format(ssml) {
        let desiredOutput = null;

        switch(this.adapter.output.format) {
            case 'md':
                // TODO: Remove this dirty hack once fixed in turndown repo
                let breakSymbols = turndownSsmlPlugin.defaults.breakSymbols;
                let md = this.turndownService
                    .turndown(ssml)
                    .replace(` ${breakSymbols.comma}`, `${breakSymbols.comma} `)
                    .replace(` ${breakSymbols.ellipsis}`, `${breakSymbols.ellipsis} `);
                return (this.adapter.output.target == 'terminal') ? marked(md) : md;
            break;
            default:
                return ssml;
            break;
        }

        return desiredOutput;
    }
}


module.exports = Output;
