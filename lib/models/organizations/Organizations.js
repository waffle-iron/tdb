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
      options: [{
        label: 'Academic',
        value: 'academic'
      }, {
        label: 'Non-Profit',
        value: 'non-profit'
      }, {
        label: 'Governamental',
        value: 'governamental'
      }, {
        label: 'Private',
        value: 'private'
      }]
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
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Images',
        label: 'Choose file',
        //  uploadProgressTemplate: 'customProgressBar'
      }
    }
  },
  urls: {
    type: [Schemas.Url],
    logDriver: true,
    optional: true
  },
  projectsId: {
    type: [String],
    optional: true,
    label: 'Related Projects',
    autoform: {
      type: 'universe-select',
      multiple: true,
      options() {
        return Projects.find().map((project) => {
          return {
            label: project.name,
            value: project._id
          };
        });
      }
    }
  },
  technologiesId: {
    type: [String],
    optional: true,
    label: 'Related Technologies',
    autoform: {
      type: 'universe-select',
      multiple: true,
      options() {
        return Technologies.find().map((tech) => {
          return {
            label: tech.name,
            value: tech._id
          };
        });
      }
    }
  },
  attachmentsId: {
    type: [String],
    optional: true,
    label: 'Related Attachments',
    autoform: {
      type: 'universe-select',
      multiple: true,
      options() {
        return Attachments.find().map((attachment) => {
          return {
            label: attachment.name,
            value: attachment._id
          };
        });
      }
    }
  },
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
