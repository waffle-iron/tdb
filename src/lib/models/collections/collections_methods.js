function checkPermissions() {
  if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
    return true;
  }
  throw new Meteor.Error(403, 'Not authorized');
}


Collections.methods = {};

Collections.methods.add = new ValidatedMethod({
  name: 'Collections.methods.add',
  validate: Schemas.Collection.validator(),
  run(doc) {
    checkPermissions();
    return Collections.insert(doc);
  }
});


Collections.methods.pushTechnology = new ValidatedMethod({
  name: 'Collections.methods.pushTechnology',
  validate({ collectionId, techId }) {
    check(collectionId, String);
    check(techId, String);
  },
  run({ collectionId, techId }) {
    return Collections.update({
      _id: collectionId
    }, {
      $addToSet: {
        technologiesId: techId
      }
    });
  }
});
