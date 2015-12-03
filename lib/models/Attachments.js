Attachments = new Mongo.Collection('Attachments');

ContentSchema = new SimpleSchema({
  type: {
    type: String
  },
  url: {
    type: String
  }
});

Attachments.Schema = new SimpleSchema({
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
    type: [ContentSchema]
  }
});
