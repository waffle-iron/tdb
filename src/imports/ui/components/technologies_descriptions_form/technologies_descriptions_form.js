/**
 * context: {Schema.Technology}
 */

import { AutoForm } from 'meteor/aldeed:autoform';

import './technologies_descriptions_form.html';

AutoForm.hooks({
  updateTechnologyDescriptionForm: {
    onError(error) {
      toastr.error(error.error);
    },
    onSuccess() {
      toastr.success('Description saved successfully');
    },
  },
});
