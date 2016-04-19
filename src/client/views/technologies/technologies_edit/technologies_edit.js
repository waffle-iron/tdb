// BUG: AutoForm autosave options triggers the submit when the
// fields with type `tags` are loaded. This code fixes for don't
// display the result message when this page loads.
// let firstAttemptOnSynonyms = 0;
// let firstAttemptOnTags = 0;

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

Template.technologiesEdit.onCreated(function() {
  this.subscribe('technologies.single', FlowRouter.getParam('id'));
});

Template.technologiesEdit.helpers({
  tech() {
    return Technologies.findOne(FlowRouter.getParam('id'));
  }
});
