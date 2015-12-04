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
          label: 'Academic',
          value: 'academic'
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

TabularTables.Organizations = new Tabular.Table({
  name: 'OrganizationsList',
  collection: Organizations,
  sub: new SubsManager(),
  pub: 'tabularOrganizationsList',
  autoWidth: false,
  responsive: true,
  stateSave: true,
  extraFields: ['_id'],
  columns: [
    {
      title: 'Name',
      data: 'name',
      width: '50%'
    },
    {
      title: 'Country',
      data: 'country',
      width: '40%'
    },
    {
      title: 'Actions',
      tmpl: Meteor.isClient && Template.organizationsActions,
      width: '10%'
  }],
  bPaginate: true
});
