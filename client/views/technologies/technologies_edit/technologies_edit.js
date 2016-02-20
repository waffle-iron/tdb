AutoForm.hooks({
  updateTechnologiesForm: {
    onSuccess() {
      toastr.success('Technology updated successfully', 'Success');
      this.template.parent().data.onSuccess();
      Modal.hide();
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.technologiesEdit.onCreated(function() {
  this.subscribe('technologies.single', this.data.techId);
});

Template.technologiesEdit.helpers({
  tech() {
    return Technologies.findOne(Template.instance().data.techId);
  }
});
