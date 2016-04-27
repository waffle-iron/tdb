/**
 * context: {
 *   @param {String} id
 *   @param {TechnologySchema} doc
 *   @param {String} type
 *   @param {String} meteormethod
 *   @param {Boolean} autosave
 * }
 */

import { AutoForm } from 'meteor/aldeed:autoform';

import './technologies_information_form.html';

Template.technologiesInformationForm.helpers({
  /**
   * [options description]
   * @param  {[type]} a [description]
   * @return {[type]}   [description]
   */
  options(a) {
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
  }
});
