Organizations = new Mongo.Collection('organizations');

/**
 *
 * Schema
 *
 */
Schemas.Organization = new SimpleSchema({
  name: {
    type: String
  },
  foundingYear: {
    type: Number
  },
  country: {
    type: String,
    autoform: {
      type: 'countryFlags'
    }
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
  },
  projectsId: {
    type: [String],
    optional: true
  },
  technologiesId: {
    type: [String],
    optional: true
  },
  attachmentsId: {
    type: [String],
    optional: true
  }
});

/**
 *
 * Behaviours
 *
 */
Organizations.attachSchema(Schemas.Organization);
Organizations.attachBehaviour('timestampable');

Organizations.helpers({
  projects() {
    return Projects.find({
      _id: {$in: this.attachmentsId || []}
    });
  },
  technologies() {
    return Technologies.find({
      _id: {$in: this.attachmentsId || []}
    });
  },
  attachments() {
    return Attachments.find({
      _id: {$in: this.attachmentsId || []}
    });
  }
});
