import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { Technologies } from '../technologies/technologies';
import { TechnologiesDescriptions } from './technologies_descriptions.js';
import { TechnologyDescriptionSchema } from './schema.js';

/**
 * Insert a new technology description
 */
export const insert = new ValidatedMethod({
  name: 'technologies_descriptions.insert',
  validate: TechnologyDescriptionSchema.validator(),
  run(doc) {
    TechnologiesDescriptions.insert(doc, (err, _id) => {
      if (err) throw err;
      return Technologies.update({
        _id: doc.technologyId
      }, {
        $addToSet: {
          descriptionsId: _id
        }
      });
    });
  },
});

/**
 * Publish a description for a technology.
 * It will make two update operations:
 *  - Change the current description published to draft (if exists)
 *  - Publish the description with the given {descriptionId}
 */
export const publish = new ValidatedMethod({
  name: 'technologies_descriptions.publish',
  validate: new SimpleSchema({
    technologyId: { type: String },
    descriptionId: { type: String }
  }).validator(),
  run({ _id }) {
    TechnologiesDescriptions.update({
      technologyId: technologyId,
      status: 'published'
    }, {
      $set: {
        status: 'draft'
      }
    });

    TechnologiesDescriptions.update(descriptionId, {
      $set: {
        status: 'published'
      }
    });
  },
});

export const remove = new ValidatedMethod({
  name: 'technologies_descriptions.remove',
  validate: new SimpleSchema({
    descriptionId: { type: String }
  }).validator(),
  run({ _id }) {
    TechnologiesDescriptions.remove(descriptionId);
  },
});
