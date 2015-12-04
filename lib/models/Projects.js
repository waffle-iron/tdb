Projects = new Mongo.Collection('Projects');

Schemas.Project = new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  evId: {
    type: String
  },
  organizationsId: {
    type: [String]
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

//                                       //
//                 EXTENSIONS            //
//                                       //
Projects.quickList = function(query) {
  return this.find(query).map(function(c) {
    return {
      label: c.name,
      value: c._id
    };
  });
};

Projects.helpers({
  link: function() {
    return FlowRouter.path('projects.view', {
      id: this._id
    });
  },
});

TabularTables.Projects = new Tabular.Table({
  name: 'ProjectsList',
  collection: Projects,
  sub: new SubsManager(),
  pub: 'tabularProjectsList',
  autoWidth: false,
  responsive: true,
  stateSave: true,
  extraFields: ['_id'],
  columns: [{
    title: 'Name',
    data: 'name',
    width: '90%'
  }, {
    title: 'Actions',
    tmpl: Meteor.isClient && Template.projectsActions,
    width: '10%'
  }],
  bPaginate: true
});
