Logs = new Mongo.Collection('logs');


Logs.Schema = new SimpleSchema({
  collection: {
    type: String
  },
  operation: {
    type: String
  },
  userId: {
    type: String,
    optional: true,
  },
  username: {
    type: String,
    optional: true
  },
  description: {
    type: String
  },
  docId: {
    type: String
  },
  docName: {
    type: String
  }
});

Logs.attachBehaviour('timestampable');
Logs.attachSchema(Logs.Schema);


Logs.helpers({
  user() {
    if (this.userId) {
      return Meteor.users.findOne({
        _id: this.userId
      });
    }
  }
});

