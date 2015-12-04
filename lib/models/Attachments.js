Attachments = new Mongo.Collection('attachments');

Schemas.Attachment = new SimpleSchema({
   name: {
    type: String
  },
  description: {
    type: String
  },
  author: {
    type: String
  },
  content: {
    type: [Schemas.Content]
  }
});
