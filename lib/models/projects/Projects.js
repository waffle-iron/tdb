Projects = new Mongo.Collection('projects');

Projects.helpers({
  link: function() {
    return window.location.host + '/projects/' + this._id + '/entry';
  }
});
/**
 *
 * Schema
 *
 */
Schemas.Project = new SimpleSchema({
  name: {
    type: String,
    esDriver: true,
    logDriver: true
  },
  description: {
    type: String,
    esDriver: true,
    logDriver: true,
    autoform: {
      type: 'textarea',
      rows: 6
    }
  },
  evId: {
    type: String,
    logDriver: true,
    optional: true
  },
  organizationsId: {
    type: [String],
    logDriver: true,
    optional: true
  },
  url: {
    type: String,
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
  },
  scenarios: {
    type: [Schemas.Scenario],
    logDriver: true,
    optional: true
  },
  usersId: {
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
Projects.attachSchema(Schemas.Project);
Projects.attachBehaviour('timestampable');
Meteor.isServer && Projects.esDriver(esClient, 'techdb', 'projects');
