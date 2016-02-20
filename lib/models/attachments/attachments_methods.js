Attachments.methods = {};

Attachments.methods.add = new ValidatedMethod({
  name: 'Attachments.methods.add',
  validate: Schemas.Attachment.validator(),
  run(doc) {
    return Attachments.insert(doc);
  }
});
Attachments.methods.update = new ValidatedMethod({
  name: 'Attachments.methods.update',
  validate: Schemas.validatedMethodUpdateSchema.validator(),
  run({_id, modifier}) {
    return Attachments.update(_id, modifier);
  }
});

Meteor.methods({
  'Attachments.methods.remove': function(attchId) {
    check(attchId, String);
    return Attachments.remove({ _id: attchId });
  }
});

