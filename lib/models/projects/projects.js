Projects = new Mongo.Collection('projects');

Schemas.Project = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String
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

Projects.attachSchema(Schemas.Project);
Projects.attachBehaviour('timestampable');
