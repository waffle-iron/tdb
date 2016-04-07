Projects.methods = {};

Projects.methods.add = new ValidatedMethod({
  name: 'Projects.methods.add',
  validate: Schemas.Project.validator(),
  run(doc) {
    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
      return Projects.insert(doc);
    }
    throw new Meteor.Error(403, 'Not authorized');
  }
});


Projects.methods.update = new ValidatedMethod({
  name: 'Projects.methods.update',
  validate: Schemas.validatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
      return Projects.update(_id, modifier);
    }
    throw new Meteor.Error(403, 'Not authorized');
  }
});

Meteor.methods({
  'Projects.methods.remove': function(projectId) {
    check(projectId, String);
    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
      return Projects.remove({ _id: projectId });
    }
    throw new Meteor.Error(403, 'Not authorized');
  }
});
