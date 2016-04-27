Template.technologiesEdit.onCreated(function() {
  this.subscribe('technologies.single', FlowRouter.getParam('id'));
});

Template.technologiesEdit.helpers({
  tech() {
    return Technologies.findOne(FlowRouter.getParam('id'));
  },
});

AutoForm.hooks({
  'update-technologies-information-form': {
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