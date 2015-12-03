Organizations = new Mongo.Collection('Organizations');

KeyPeopleSchema = new SimpleSchema({
  name: {
    type: String
  },
  role: {
    type: String
  }
});

Organizations.Schema = new SimpleSchema({
  name: {
    type: String
  },
  foundingYear: {
    type: Number
  },
  country: {
    type: String
  },
  type: {
    type: String,
    allowedValues: ['Academic', 'Non-profit', 'Governamental', 'Private']
  },
  keyPeople: {
    type: [KeyPeopleSchema]
  },
  logo: {
    type: ImagesSchema
  },
  urls: {
    type: [UrlsSchema]
  }
});
