Technologies = new Mongo.Collection('technologies');

Mongo.Collection.prototype.quickList = function(query = {}, identifier = 'name') {
  return this.find(query).map((c) => {
    return {
      label: c[identifier],
      value: c._id
    };
  });
};
/**
 *
 * Schema
 *
 */
Schemas.Technology = new SimpleSchema({
  techId: {
    type: String,
    label: 'techId',
    optional: true,
    esDriver: true
  },
  name: {
    type: String,
    label: 'Title',
    esDriver: true,
    logDriver: true,
  },
  synonyms: {
    type: [String],
    optional: true,
    label: 'Alternative titles',
    autoform: {
      type: 'tags'
    }
  },
  status: {
    type: String,
    esDriver: true,
    logDriver: true,
    allowedValues: ['draft', 'review', 'published'],
    autoform: {
      type: 'selectize',
      options: [{
        label: 'Draft',
        value: 'draft'
      }, {
        label: 'Review',
        value: 'review'
      }, {
        label: 'Published',
        value: 'published'
      }]
    }
  },
  tags: {
    type: [String],
    optional: true,
    autoform: {
      type: 'tags'
    }
  },
  description: {
    type: [Schemas.Description],
    label: 'Descriptions',
    optional: true
  },
  contextualDescription: {
    type: [Schemas.contextualDescription],
    label: 'Contextual Descriptions',
    optional: true
  },
  images: {
    type: [Schemas.Image],
    optional: true
  },
  urls: {
    type: [Schemas.Url],
    optional: true
  },
  readiness: {
    type: [Schemas.Readiness],
    optional: true,
    autoform: {
      omit: true
    }
  },
  impact: {
    type: [Schemas.Impact],
    optional: true
  },
  attachmentsId: {
    type: [String],
    optional: true,
    label: 'Related Attachments',
    autoform: {
      afFieldInput: {
        type: 'universe-select',
        multiple: true,
        uniPlaceholder: 'Search attachments by title...',
        options() {
          return Attachments.find().map((attachment) => {
            return {
              label: attachment.name,
              value: attachment._id
            };
          });
        }
      }
    }
  },
  organizationsId: {
    type: [String],
    optional: true,
    label: 'Related Organizations',
    autoform: {
      type: 'universe-select',
      multiple: true,
      uniPlaceholder: 'Search organizations by title...',
      options() {
        return Organizations.find().map((org) => {
          return {
            label: org.name,
            value: org._id
          };
        });
      }
    }
  },
  projectsId: {
    type: [String],
    optional: true,
    label: 'Related Projects',
    autoform: {
      type: 'universe-select',
      multiple: true,
      uniPlaceholder: 'Search projects by title...',
      options() {
        return Projects.find().map((project) => {
          return {
            label: project.name,
            value: project._id
          };
        });
      }
    }
  }
});


/**
 *
 * Helpers
 *
 */
Technologies.helpers({
  
  getPublishedDescription() {
    this.description = this.description || [];
    return _.find(this.description, function(desc) {
      return desc.status === 'published';
    }) || {};
  },
  getShowcasedImage() {
    if (!this.images) return false;
    this.images = this.images || [];
    return _.find(this.images, function(desc) {
      return desc && desc.showcased;
    }) || {};
  },
  getCollections() {
    return Collections.find({
      technologiesId: this._id
    });
  }
});

/**
 *
 * Behaviours
 *
 */
Technologies.attachSchema(Schemas.Technology);
Technologies.attachBehaviour('timestampable');
Meteor.isServer && Technologies.esDriver(esClient, 'techdb', 'technologies', (cleanedDoc, doc, hook) => {
  let tDoc = hook.transform();
  let publishedDescription = tDoc.getPublishedDescription();
  if (publishedDescription && publishedDescription.longText) {
    cleanedDoc.description = TagStripper.strip(publishedDescription.longText);
    cleanedDoc.shortDescription = publishedDescription.shortText || '';
  } else {
    delete cleanedDoc.description;
  }

  let showcasedImage = tDoc.getShowcasedImage();
  if (showcasedImage) {
    cleanedDoc.image = showcasedImage.src;
  }
  delete cleanedDoc.images;

  return cleanedDoc;
});

