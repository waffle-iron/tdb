Projects.methods = {};

Projects.methods.add = new ValidatedMethod({
  name: 'Projects.methods.add',
  validate: Schemas.Project.validator(),
  run(doc) {
    return Projects.insert(doc);
  }
});
