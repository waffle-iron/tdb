Organizations = new Mongo.Collection('organizations');

/**
 *
 * Schema
 *
 */
Schemas.Organization = new SimpleSchema({
  name: {
    type: String,
    esDriver: true,
    logDriver: true
  },
  foundingYear: {
    type: Number,
    esDriver: true,
    logDriver: true
  },
  country: {
    type: String,
    esDriver: true,
    logDriver: true,
    autoform: {
      type: 'countryFlags'
    }
  },
  type: {
    type: String,
    esDriver: true,
    logDriver: true,
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
    logDriver: true,
    optional: true
  },
  logo: {
    type: String,
    esDriver: true,
    logDriver: true,
    optional: true
  },
  urls: {
    type: [Schemas.Url],
    logDriver: true,
    optional: true
  },
  projectsId: {
    type: [String],
    logDriver: true,
    optional: true
  },
  technologiesId: {
    type: [String],
    logDriver: true,
    optional: true
  },
  attachmentsId: {
    type: [String],
    logDriver: true,
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
Meteor.isServer && Organizations.esDriver(esClient, 'techdb', 'organizations');


/**
 *
 * Helpers
 *
 */
Organizations.helpers({
  getProjects() {
      return Projects.find({
        _id: {
          $in: this.projectsId || []
        }
      });
    },
    technologies() {
      return Technologies.find({
        _id: {
          $in: this.technologiesId || []
        }
      });
    },
    attachments() {
      return Attachments.find({
        _id: {
          $in: this.attachmentsId || []
        }
      });
    },
    logoImage() {
      if (this.logo) {
        return Images.findOne({
          _id: this.logo
        });
      }
    }
});
