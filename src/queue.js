const EventEmitter = require('events');
var amqp = require('amqplib/callback_api');
const NluRequest = require('./request/nlu_request');

/**
  * Message queue
  */
class Queue extends EventEmitter
{
  constructor()
  {
    super();
    this.q = 'lowbot';
    this.url = 'amqp://localhost';
  }

  send(msg)
  {
    amqp.connect(this.url, (err, conn) => {
      conn.createChannel( (err, ch) => {
        let req = new NluRequest(msg);
        let data = req.toJSON()
        console.log('data', data);
        ch.sendToQueue(this.q, new Buffer(data));
        console.log(" [x] Sent %s to %s queue", req.content, this.q);
      });
      setTimeout(function() { conn.close(); }, 500);
    });
  }

  watch()
  {
    amqp.connect(this.url, (err, conn) => {
      conn.createChannel( (err, ch) => {
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", this.q);
        ch.consume(this.q, (msg) => {
          let reqData = JSON.parse( msg.content.toString('utf8') );
          console.log(" [x] Received %s from %s queue", reqData.content, this.q);
          this.emit('req', reqData);
        }, {noAck: true});
      });
    });
  }
}

module.exports = Queue;
