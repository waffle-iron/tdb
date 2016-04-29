/**
 * context: {TechnologySchema}
 */

import { AutoForm } from 'meteor/aldeed:autoform';

import './technologies_descriptions_form.html';

AutoForm.hooks({
  'update-technologies-descriptions-form': {
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
    onSuccess() {
      toastr.success('Description saved successfully');
      this.template.get('isEditing').set(false);
    },
  },
});