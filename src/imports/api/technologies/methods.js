import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Technologies } from './technologies.js';
import { TechnologySchema } from './schema.js';

function checkPermissions() {
  if (Roles.userIsInRole(Meteor.user(), ['admin', 'editor'])) {
    return true;
  }
  throw new Meteor.Error(403, 'Not authorized');
}

export const insert = new ValidatedMethod({
  name: 'technologies.insert',
  validate: TechnologySchema.validator(),
  run(doc) {
    checkPermissions();
    return Technologies.insert(doc);
  }
});

export const update = new ValidatedMethod({
  name: 'technologies.update',
  validate: new SimpleSchema({
    _id: { type: String },
    modifier: { type: Object, blackbox: true }
  }).validator(),
  run({ _id, modifier }) {
    checkPermissions();
    return Technologies.update(_id, modifier);
  }
});

export const remove = new ValidatedMethod({
  name: 'technologies.remove',
  validate: new SimpleSchema({
    _id: { type: String }
  }).validator(),
  run({ _id }) {
    checkPermissions();
    Technologies.remove({
      _id: techId
    });
  }
});