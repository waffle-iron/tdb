Attachments.methods = {};

Attachments.methods.add = new ValidatedMethod({
  name: 'Attachments.methods.add',
  validate: Schemas.Attachment.validator(),
  run(doc) {
    return Attachments.insert(doc);
  }
});

Meteor.methods({
  'Attachments.methods.remove': function(attchId) {
    check(attchId, String);
    return Attachments.remove({_id: attchId});
  }
});
