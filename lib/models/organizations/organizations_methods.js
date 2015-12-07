Organizations.methods = {};

Organizations.methods.add = new ValidatedMethod({
  name: 'Organizations.methods.add',
  validate: Schemas.Organization.validator(),
  run(doc) {
    return Organizations.insert(doc);
  }
});
