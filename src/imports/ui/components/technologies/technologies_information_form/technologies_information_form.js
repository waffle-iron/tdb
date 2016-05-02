/**
 * data: {
 *   @param {String} id
 *   @param {TechnologySchema} doc
 *   @param {String} type
 *   @param {String} meteormethod
 *   @param {Boolean} autosave
 * }
 */

import { Meteor } from 'meteor/meteor';
import { AutoForm } from 'meteor/aldeed:autoform';

import './technologies_information_form.html';

Template.technologiesInformationForm.events({
  'click [data-action="select-image"]': function(event, template) {
    const imageId = this.src;

    Meteor.call('technologies.updateShowcasedImage', {
      _id: Template.instance().data.doc._id,
      imageId: imageId
    }, (err, res) => {
      if (err) {
        toastr.error(err.error, 'Error');
        throw err;
      }
      toastr.success('Image updated successfully', 'Success');
    });
  }
});

Template.technologiesInformationForm.helpers({
  options() {
    const data = Template.instance().data;

    if (!data) {
      throw Meteor.Error(
        '[technologiesInformationForm]', 'Form options are required.'
      );
    }

    return {
      id: data.id,
      doc: data.doc,
      type: data.type,
      meteormethod: data.meteormethod,
      autosave: data.autosave || false,
      singleMethodArgument: data.type === 'method-update'
    };
  },

  onUploadSuccess() {
    const template = Template.instance();
    return (fileObj) => {
      if (fileObj.hasStored('images')) {
        Meteor.call('technologies.linkImage', {
          _id: template.data.doc._id,
          imageId: fileObj._id
        }, (err, res) => {
          if (err) {
            toastr.error(err.error, 'Error');
            throw err;
          }
          return toastr.success('Image added to technology successfully', 'Success');
        });
      }
    };
  }
});
