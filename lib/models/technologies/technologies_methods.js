Technologies.methods = {};

Technologies.methods.add = new ValidatedMethod({
  name: 'Technologies.methods.add',
  validate: Schemas.Technology.validator(),
  run(doc) {
    return Technologies.insert(doc);
  }
});
