Attachments.methods = {};

Attachments.methods.add = new ValidatedMethod({
  name: 'Attachments.methods.add',
  validate: Schemas.Attachment.validator(),
  run(doc) {
    return Attachments.insert(doc);
  }
});
