const Data = require('data-bite');

class KnowledgeBase
{
  constructor(adapter, subject)
  {
    this.adapter = adapter;
    this.subject = subject;
  }

  learn()
  {
    // TODO: Abstract to adapter
    let network = this.adapter.info.name;
    let nid = this.subject.id;
    let username = this.subject.username;

    // Create data store for user if not already exist
    let dataService = new Data().service();
    dataService.get('profile', {
      filter: {network, nid, username}
    }, ['identity']).then( (res) => {
      if (res.meta.count == 0) {
        dataService
          .create('user', {
            name: username
          }).then(user => {
            return dataService.create('profile', Object.assign({network, nid, username}, {
              // Relation
              identity: {
                id: user.data.id,
                type: 'users'
              }
            }));
          });
      }
    });
  }
}

module.exports = KnowledgeBase;
