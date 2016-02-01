AutoForm.hooks({
  updateOrganizationsForm: {
    onSuccess() {
      toastr.success('Organization updated successfully', 'Success');
      Modal.hide();
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.orgEdit.onCreated(function() {
  this.subscribe('organizations.single', this.data.orgId);
});

Template.orgEdit.helpers({
  org() {
    return Organizations.findOne(Template.instance().data.orgId);
  }
});
