import { AutoForm } from 'meteor/aldeed:autoform';

import './technologies_information_form.html';

AutoForm.hooks({
  updateBasicInformationTechnologiesForm: {
    onSuccess() {
      let key = $(this.autoSaveChangedElement).attr('data-schema-key');

      // if (firstAttemptOnTags && firstAttemptOnSynonyms) {
      toastr.success(`Technology <b>${key}</b> updated successfully`, 'Success');
      // }

      // if (key === 'synonyms') firstAttemptOnSynonyms = true;
      // if (key === 'tags') firstAttemptOnTags = true;
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});
