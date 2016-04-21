import { Mongo } from 'meteor/mongo';
import {
  TechnologySchema,
  DESCRIPTION_STATUS
}
from './schema.js';

export const Technologies = new Mongo.Collection('technologies');

Technologies.attachSchema(TechnologySchema);
Technologies.attachBehaviour('timestampable');

Technologies.helpers({
  getOrderedDescriptions() {
    const published = this.description.filter(d => d.status === DESCRIPTION_STATUS.PUBLISHED);
    const review = this.description.filter(d => d.status === DESCRIPTION_STATUS.REVIEW);
    const draft = this.description.filter(d => d.status === DESCRIPTION_STATUS.DRAFT);
    return Array.prototype.concat(published, review, draft);
  },
  getPublishedDescription() {
    this.description = this.description || [];
    return _.find(this.description, function(desc) {
      return desc.status === 'published';
    }) || {};
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
