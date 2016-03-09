Technologies.methods = {};

function checkPermissions() {
  if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
    return true;
  }
  throw new Meteor.Error(403, 'Not authorized');
}

Technologies.methods.add = new ValidatedMethod({
  name: 'Technologies.methods.add',
  validate: Schemas.Technology.validator(),
  run(doc) {
    checkPermissions();
    return Technologies.insert(doc);
  }
});

Technologies.methods.update = new ValidatedMethod({
  name: 'Technologies.methods.update',
  validate: Schemas.validatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    checkPermissions()
    return Technologies.update(_id, modifier);
  }
});

Meteor.methods({
  'Technologies.methods.remove': function(techId) {
    check(techId, String);
    checkPermissions();
    return Technologies.remove({
      _id: techId
    });
  }
});
