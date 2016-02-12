Technologies.methods = {};

Technologies.methods.add = new ValidatedMethod({
  name: 'Technologies.methods.add',
  validate: Schemas.Technology.validator(),
  run(doc) {
    return Technologies.insert(doc);
  }
});

Meteor.methods({
  'Technologies.methods.remove': function(techId) {
    check(techId, String);
    return Technologies.remove({_id: techId});
  }
});
