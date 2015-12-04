Attachments = new Mongo.Collection('Attachments');

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
