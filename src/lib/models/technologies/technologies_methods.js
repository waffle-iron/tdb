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
  'Technologies.methods.publishDescription': function(descriptionId) {
    check(descriptionId, String);
    checkPermissions();

    const query = { 'description._id': descriptionId };
    const tech = Technologies.findOne(query);

    // Indexes from subdocuments to apply on modifier
    const currentIndex = _.indexOf(_.pluck(tech.description, '_id'), descriptionId);
    const publishedIndex = _.indexOf(_.pluck(tech.description, 'status'), 'published');

    let modifier = { $set: {} };
    modifier.$set[`description.${publishedIndex}.status`] = 'draft';
    modifier.$set[`description.${publishedIndex}.updatedBy`] = this.userId;
    modifier.$set[`description.${publishedIndex}.updatedAt`] = new Date();

    modifier.$set[`description.${currentIndex}.status`] = 'published';
    modifier.$set[`description.${currentIndex}.updatedBy`] = this.userId;
    modifier.$set[`description.${currentIndex}.updatedAt`] = new Date();

    return Technologies.update({ _id: tech._id }, modifier);
  },
  'Technologies.methods.deleteDescription': function(descriptionId) {
    check(descriptionId, String);
    checkPermissions();

    const query = { 'description._id': descriptionId };
    const modifier = {
      $pull: {
        description: {
          _id: descriptionId
        }
      }
    };

    return Technologies.update(query, modifier);
  },
  'Technologies.methods.remove': function(techId) {
    check(techId, String);
    checkPermissions();
    return Technologies.remove({
      _id: techId
    });
  }
});
