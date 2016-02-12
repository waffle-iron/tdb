Projects.methods = {};

Projects.methods.add = new ValidatedMethod({
  name: 'Projects.methods.add',
  validate: Schemas.Project.validator(),
  run(doc) {
    return Projects.insert(doc);
  }
});

Meteor.methods({
  'Projects.methods.remove': function(projectId) {
    check(projectId, String);
    return Projects.remove({_id: projectId});
  }
});
