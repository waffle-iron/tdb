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


Collections.methods.moveTechnology = new ValidatedMethod({
  name: 'Collections.methods.moveTechnology',
  validate({ source, target, techId}) {
    check(source, String);
    check(target, String);
    check(techId, String);
  },
  run({ source, target, techId}) {
    console.log('source ', source);
    console.log('target ', target);
    console.log('techId ', techId);
    let sourceCollection = Collections.findOne({
      _id: source
    });

    if (!sourceCollection) throw new Meteor.Error('source-not-found');
    if (!_.contains(sourceCollection.technologiesId, techId)) throw new Meteor.Error('not-in-source');

    let targetCollection = Collections.findOne({
      _id: target
    });

    if (!targetCollection) throw new Meteor.Error('target-not-found');
    if (_.contains(targetCollection.technologiesId, techId)) throw new Meteor.Error('target-already-has-tech');

    let sourceUpdate = Collections.update({
      _id: source
    }, {
      $pull: {
        technologiesId: techId
      }
    });

    if (!sourceUpdate) throw new Meteor.Error('source-update-error');

    let targetUpdate =  Collections.update({
      _id: target
    }, {
      $addToSet: {
        technologiesId: techId
      }
    });

    if (!targetUpdate) throw new Meteor.Error('source-update-error');

    return true;
  }
});
