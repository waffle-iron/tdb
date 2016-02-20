Projects.methods = {};

Projects.methods.add = new ValidatedMethod({
  name: 'Projects.methods.add',
  validate: Schemas.Project.validator(),
  run(doc) {
    return Projects.insert(doc);
  }
});


Projects.methods.update = new ValidatedMethod({
  name: 'Projects.methods.update',
  validate: Schemas.validatedMethodUpdateSchema.validator(),
  run({_id, modifier}) {
    return Projects.update(_id, modifier);
  }
});

Meteor.methods({
  'Projects.methods.remove': function(projectId) {
    check(projectId, String);
    return Projects.remove({_id: projectId});
  }
});
