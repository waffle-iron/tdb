Projects = new Mongo.Collection('projects');

/**
 *
 * Schema
 *
 */
Schemas.Project = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String,
    autoform: {
      type: 'textarea',
      rows: 6
    }
  },
  evId: {
    type: String,
    optional: true
  },
  organizationsId: {
    type: [String],
    optional: true
  },
  url: {
    type: String,
    optional: true
  },
  technologiesId: {
    type: [String],
    optional: true
  },
  attachmentsId: {
    type: [String],
    optional: true
  },
  scenarios: {
    type: [Schemas.Scenario],
    optional: true
  },
});

/**
 *
 * Behaviours
 *
 */
Projects.attachSchema(Schemas.Project);
Projects.attachBehaviour('timestampable');
