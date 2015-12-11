Technologies = new Mongo.Collection('technologies');

Schemas.Technology = new SimpleSchema({
  name: {
    type: String
  },
  synonyms: {
    type: [String],
    optional: true,
    autoform: {
      type: 'tags'
    }
  },
  status: {
    type: String,
    allowedValues: ['draft', 'review', 'published'],
    autoform: {
      type: 'selectize',
      options: [
        {
          label: 'Draft',
          value: 'draft'
        },
        {
          label: 'Review',
          value: 'review'
        },
        {
          label: 'Published',
          value: 'published'
        }
      ]
    }
  },
  tags: {
    type: [String],
    autoform: {
      type: 'tags'
    }
  },
  description: {
    type: [Schemas.Description],
    optional: true
  },
  organizationsId: {
    type: [String],
    optional: true,
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
    optional: true
  }
});


Technologies.helpers({
  getPublishedDescription() {
    this.description = this.description || [];
    return _.find(this.description, function(desc) {
      return desc.status === 'Published';
    }) || {};
  },
  getShowcasedImage() {
    this.images = this.images || [];
    return _.find(this.images, function(desc) {
      return desc.showcased;
    }) || {};
  }
});


Technologies.attachSchema(Schemas.Technology);
Technologies.attachBehaviour('timestampable');
