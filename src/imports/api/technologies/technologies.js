import { Mongo } from 'meteor/mongo';

import { TechnologySchema } from './schema.js';
import { TechnologiesDescriptions } from '../technologies_descriptions/technologies_descriptions.js';
import { DESCRIPTION_STATUS } from '../technologies_descriptions/schema';

export const Technologies = new Mongo.Collection('technologies');

Technologies.attachSchema(TechnologySchema);
Technologies.attachBehaviour('timestampable');

Technologies.helpers({
  descriptions() {
    return TechnologiesDescriptions.find({
      _id: {
        $in: this.descriptionsId ? this.descriptionsId : []
      }
    });
  },
  getPublishedDescription() {
    return TechnologiesDescriptions.findOne({
      technologyId: this._id,
      status: DESCRIPTION_STATUS.PUBLISHED
    });
  },
  getShowcasedImage() {
    if (!this.images) return false;
    this.images = this.images || [];
    return _.find(this.images, function(desc) {
      return desc && desc.showcased;
    }) || {};
  },
  getCollections() {
    return Collections.find({
      technologiesId: this._id
    });
  }
});
