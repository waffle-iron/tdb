Technologies.methods = {};

Technologies.methods.add = new ValidatedMethod({
  name: 'Technologies.methods.add',
  validate: Schemas.Technology.validator(),
  run(doc) {
    if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
      return Technologies.insert(doc);
    }
    throw new Meteor.Error(403, 'Not authorized');
  }
});

Technologies.methods.update = new ValidatedMethod({
  name: 'Technologies.methods.update',
  validate: Schemas.validatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
      return Technologies.update(_id, modifier);
    }
    throw new Meteor.Error(403, 'Not authorized');
  }
});

Meteor.methods({
  'Technologies.methods.remove': function(techId) {
    check(techId, String);
    if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
      return Technologies.remove({ _id: techId });
    }
    throw new Meteor.Error(403, 'Not authorized');
  }
});
