Organizations = new Mongo.Collection('organizations');

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
    allowedValues: ['academic', 'non-profit', 'governamental', 'private'],
     autoform: {
      type: 'selectize',
      options: [
        {
          label: 'Draft',
          value: 'draft'
        },
        {
          label: 'Non-Profit',
          value: 'non-profit'
        },
        {
          label: 'Governamental',
          value: 'governamental'
        },
        {
          label: 'Private',
          value: 'private'
        }
      ]
    }
  },
  keyPeople: {
    type: [Schemas.KeyPeople],
    optional: true
  },
  logo: {
    type: Schemas.Image,
    optional: true
  },
  urls: {
    type: [Schemas.Url],
    optional: true
  }
});

Organizations.attachSchema(Schemas.Organization);
Organizations.attachBehaviour('timestampable');

