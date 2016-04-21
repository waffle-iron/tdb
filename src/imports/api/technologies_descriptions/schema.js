import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const DESCRIPTION_STATUS = {
  DRAFT: 'draft',
  REVIEW: 'review',
  PUBLISHED: 'published'
};

export const TechnologyDescriptionSchema = new SimpleSchema({
  technologyId: {
    type: String
  },
  status: {
    type: String,
    allowedValues: Object.keys(DESCRIPTION_STATUS).map(key => DESCRIPTION_STATUS[key]),
    autoform: {
      type: 'selectize',
      options: [{
        label: 'Draft',
        value: DESCRIPTION_STATUS.DRAFT
      }, {
        label: 'Review',
        value: DESCRIPTION_STATUS.REVIEW
      }, {
        label: 'Published',
        value: DESCRIPTION_STATUS.PUBLISHED
      }]
    }
  },
  longText: {
    type: String,
    autoform: {
      type: 'markdown',
    }
  },
  shortText: {
    type: String,
    optional: true,
    max: 140,
    autoform: {
      type: 'textarea',
      rows: 3
    }
  },
  applications: {
    type: [String],
    optional: true,
    autoform: {
      omit: true
    }
  },
  benefits: {
    type: [String],
    optional: true,
    autoform: {
      omit: true
    }
  }
});
