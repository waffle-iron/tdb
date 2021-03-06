import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const TechnologySchema = new SimpleSchema({
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
    autoform: {
      afFieldInput: {
        placeholder: "Drone Delivery"
      }
    }
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
