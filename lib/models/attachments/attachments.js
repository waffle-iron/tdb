Attachments = new Mongo.Collection('attachments');

Schemas.Attachment = new SimpleSchema({
  title: {
    type: String
  },
  description: {
    type: String,
    autoform: {
      afFieldInput: {
        type: "textarea",
        rows: 8
      }
    }
  },
  url: {
    type: String
  },
  thumbnail: {
    type: String
  }

});

Attachments.attachSchema(Schemas.Attachment);
Attachments.attachBehaviour('timestampable');
