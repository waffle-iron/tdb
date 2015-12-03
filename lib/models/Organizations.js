Organizations = new Mongo.Collection('Organizations');

KeyPeopleSchema = new SimpleSchema({
  name: {
    type: String
  },
  role: {
    type: String
  }
});

LogoSchema = new SimpleSchema({
  src: {
    type: String
  },
  width: {
    type: String
  },
  height: {
    type: String
  }
});

UrlSchema = new SimpleSchema({
  url: {
    type: String
  },
  type: {
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
    type: String // Academic, Non-profit, Governamental or Private
  },
  keyPeople: {
    type: [KeyPeopleSchema]
  },
  logo: {
    type: LogoSchema
  },
  urls: {
    type: [UrlSchema]
  }
});
