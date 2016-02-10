Attachments = new Mongo.Collection('attachments');

Schemas.Attachment = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput: {
        type: "textarea",
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
  thumbnaillUrl: {
    type: String,
    optional: true
  }
});

Attachments.attachSchema(Schemas.Attachment);
Attachments.attachBehaviour('timestampable');
