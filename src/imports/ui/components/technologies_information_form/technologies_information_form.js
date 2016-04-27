import { AutoForm } from 'meteor/aldeed:autoform';

import './technologies_information_form.html';

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
  }
});
