CollectionsSet.methods = {};
CollectionsSet.methods.add = new ValidatedMethod({
  name: 'CollectionsSet.methods.add',
  validate: Schemas.CollectionsSet.validator(),
  run(doc) {
    return CollectionsSet.insert(doc);

  }
});
