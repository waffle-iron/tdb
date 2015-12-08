Attachments = new Mongo.Collection('attachments');

Schemas.Attachment = new SimpleSchema({
   name: {
    type: String
  },
  description: {
    type: String
  },
  // This is the createdBy field
  // author: {
  //   type: String,
  // },
  content: {
    type: [Schemas.Content],
    optional: true
  }
});

Attachments.attachSchema(Schemas.Attachment);
Attachments.attachBehaviour('timestampable');

