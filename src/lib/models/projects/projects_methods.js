Projects.methods = {};

Projects.methods.add = new ValidatedMethod({
  name: 'Projects.methods.add',
  validate: Schemas.Project.validator(),
  run(doc) {
    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
      return Projects.insert(doc);
    }
    throw new Meteor.Error(403, 'Not authorized');
  }
});


Projects.methods.update = new ValidatedMethod({
  name: 'Projects.methods.update',
  validate: Schemas.validatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
      return Projects.update(_id, modifier);
    }
    throw new Meteor.Error(403, 'Not authorized');
  }
});

Meteor.methods({
  'Projects.methods.remove': function(projectId) {
    check(projectId, String);
    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
      return Projects.remove({ _id: projectId });
    }
    throw new Meteor.Error(403, 'Not authorized');
  },
  'Projects.methods.pushCollectionSet': function(projectId, collectionSet) {
    check(projectId, String);
    check(collectionSet, Schemas.CollectionsSet);

    if (Roles.userIsInRole(Meteor.userId(), ['admin'])) {
      return Projects.update({
        _id: projectId
      }, {
        $push: {
          collectionsSet: collectionSet
        }
      });
    }
    throw new Meteor.Error(403, 'Not authorized');
  }
});


/*Projects.methods.pushCollectionsSet = new ValidatedMethod({
  name: 'Projects.methods.pushCollectionsSet',
  validate: Schemas.validatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    if (Roles.userIsInRole(Meteor.user(), ['admin'])) {
      return Projects.update(_id, modifier);
    }
    throw new Meteor.Error(403, 'Not authorized');
  }
});*/


Projects.methods.pushCollectionsSet = new ValidatedMethod({
  name: 'Projects.methods.pushCollectionsSet',
  validate({projectId, collectionsSet}) {
    check(projectId, String);
    check(collectionsSet, Schemas.CollectionsSet);
  },
  run({projectId, collectionsSet}) {
    return Projects.update({
      _id: projectId
    }, {
      $push: {
        collectionsSet: collectionsSet
      }
    });
  }
});
