Attachments = new Mongo.Collection('attachments');

Schemas.Attachment = new SimpleSchema({
  name: {
    type: String,
    esDriver: true
  },
  description: {
    type: String,
    esDriver: true,
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'textarea',
        rows: 8
      }
    }
  },
  url: {
    type: String,
    autoform: {
      type: 'hidden'
    }
  },
  imageUrl: {
    type: String,
    esDriver: true,
    optional: true
  }
});

Attachments.attachSchema(Schemas.Attachment);
Attachments.attachBehaviour('timestampable');
Meteor.isServer && Attachments.esDriver(esClient, 'techdb', 'attachments');
