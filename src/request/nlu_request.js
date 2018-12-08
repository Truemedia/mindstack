const stripMentions = require('strip-mentions');
const Request = require('./base');

class NluRequest extends Request
{
  constructor(data)
  {
    super(data);
  }

  // TODO: Abstract into discord request
  get author()
  {
    let {id, username} = this.data.author;
    return {id, username};
  }

  // TODO: Abstract into discord request
  get channel()
  {
    let {id, name} = this.data.channel;
    return {id, name};
  }

  // TODO: Abstract into discord request
  get content()
  {
    return stripMentions( this.data.content.toString() );
  }

  // TODO: Abstract into discord request
  get mentions()
  {
    return this.data.mentions.users.keyArray()
  }

  static fromJSON(data, stringified = true)
  {
    if (stringified) {
      data = JSON.parse(data);
    }
    return new this(data);
  }

  toJSON(stringify = true)
  {
    let {author, channel, content, mentions} = this;
    let req = {author, channel, content, mentions};
    return stringify ? JSON.stringify(req) : req;
  }
}

module.exports = NluRequest;
