Technologies.methods = {};

function checkPermissions() {
  if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
    return true;
  }
  throw new Meteor.Error(403, 'Not authorized');
}

Technologies.methods.add = new ValidatedMethod({
  name: 'Technologies.methods.add',
  validate: Schemas.Technology.validator(),
  run(doc) {
    checkPermissions();
    return Technologies.insert(doc);
  }
});

Technologies.methods.update = new ValidatedMethod({
  name: 'Technologies.methods.update',
  validate: Schemas.validatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    checkPermissions();
    return Technologies.update(_id, modifier);
  }
});

/**
 * Receives an {description._id} and a modifier
 * that contains the keys of the description schema.
 * This method converts the modifier to a array modifier
 * to edit just the matched description on the technology.
 */
Technologies.methods.updateDescription = new ValidatedMethod({
  name: 'Technologies.methods.updateDescription',
  validate: Schemas.validatedMethodUpdateSchema.validator(),
  run({ _id, modifier }) {
    checkPermissions();

    const query = { 'description._id': _id };
    const keys = Object.keys(modifier.$set);

    keys.forEach(key => {
      modifier.$set[`description.$.${key}`] = modifier.$set[key];
      delete modifier.$set[key];
    });

    return Technologies.update(query, modifier);
  }
});

Meteor.methods({
  'Technologies.methods.remove': function(techId) {
    check(techId, String);
    checkPermissions();
    return Technologies.remove({
      _id: techId
    });
  }
});
