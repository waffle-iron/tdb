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
  getProjects() {
    console.log(this.projectsId);
    let p = Projects.find({
      _id: {$in: this.projectsId || []}
    });
    console.log(p.fetch());
    return p;
  },
  technologies() {
    return Technologies.find({
      _id: {$in: this.technologiesId || []}
    });
  },
  attachments() {
    return Attachments.find({
      _id: {$in: this.attachmentsId || []}
    });
  }
});
