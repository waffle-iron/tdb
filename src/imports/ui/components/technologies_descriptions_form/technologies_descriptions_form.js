/**
 * context: {Schema.Technology}
 */

import { AutoForm } from 'meteor/aldeed:autoform';

import './technologies_descriptions_form.html';

AutoForm.hooks({
  'update-technologies-descriptions-form': {
    onError(error) {
      toastr.error(error.error);
    },
    onSuccess() {
      toastr.success('Description saved successfully');
      this.template.get('isEditing').set(false);
    },
  },
});
