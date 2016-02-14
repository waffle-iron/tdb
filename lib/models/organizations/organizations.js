Organizations = new Mongo.Collection('organizations');

/**
 *
 * Schema
 *
 */
Schemas.Organization = new SimpleSchema({
  name: {
    type: String,
    esDriver: true
  },
  foundingYear: {
    type: Number,
    esDriver: true
  },
  country: {
    type: String,
    autoform: {
      type: 'countryFlags'
    }
  },
  type: {
    type: String,
    esDriver: true,
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
    type: String,
    esDriver: true,
    optional: true
  },
  urls: {
    type: [Schemas.Url],
    optional: true
  },
  projectsId: {
    type: [String],
    esDriver: true,
    optional: true
  },
  technologiesId: {
    type: [String],
    esDriver: true,
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
