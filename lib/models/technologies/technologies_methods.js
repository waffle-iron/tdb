Technologies.methods = {};

Technologies.methods.add = new ValidatedMethod({
  name: 'Technologies.methods.add',
  validate: Schemas.Technology.validator(),
  run(doc) {
    return Technologies.insert(doc);
  }
});

Technologies.methods.update = new ValidatedMethod({
  name: 'Technologies.methods.update',
  validate: Schemas.validatedMethodUpdateSchema.validator(),
  run({_id, modifier}) {
    return Technologies.update(_id, modifier);
  }
});

Meteor.methods({
  'Technologies.methods.remove': function(techId) {
    check(techId, String);
    return Technologies.remove({_id: techId});
  }
});
