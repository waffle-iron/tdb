/**
 * data: {
 * 	@param {Integer} width
 * 	@param {Integer} height
 * 	@param {Schemas.Image} image
 * 	@param {String} technologyId
 * }
 */

import { Template } from 'meteor/templating';

import './technologies_images_item.html';

Template.technologiesImagesItem.helpers({
  image(src) {
    return Images.findOne({ _id: Template.instance().data.image.src });
  },

  imageOptions() {
    return {
      height: Template.instance().data.height,
      width: Template.instance().data.width
    };
  },
});
