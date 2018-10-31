require('dotenv').config();
const Kitsu = require('kitsu/node');

module.exports = class Data
{
  constructor()
  {
    this.host = process.env['DATA_HOST'];
    this.port = process.env['DATA_PORT'];
  }

  get baseURL()
  {
    return `http://${this.host}:${this.port}`;
  }

  service()
  {
    let {baseURL} = this;
    return new Kitsu({baseURL});
  }
}
