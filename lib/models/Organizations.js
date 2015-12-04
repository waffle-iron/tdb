Organizations = new Mongo.Collection('Organizations');

Schemas.Organization = new SimpleSchema({
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
    type: [Schemas.KeyPeople]
  },
  logo: {
    type: Schemas.Image
  },
  urls: {
    type: [Schemas.Url]
  }
});
