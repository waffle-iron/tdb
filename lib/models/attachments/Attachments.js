Attachments = new Mongo.Collection('attachments');

Schemas.Attachment = new SimpleSchema({
  name: {
    type: String,
    esDriver: true,
    logDriver: true
  },
  description: {
    type: String,
    esDriver: true,
    logDriver: true,
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
    optional: true,
    logDriver: true
  },
  imageUrl: {
    type: String,
    logDriver: true,
    esDriver: true,
    optional: true
  },
  fileId: {
    type: String,
    optional: true
  }
});

Attachments.attachSchema(Schemas.Attachment);
Attachments.attachBehaviour('timestampable');
Meteor.isServer && Attachments.esDriver(esClient, 'techdb', 'attachments');
