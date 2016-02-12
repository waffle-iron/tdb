AutoForm.hooks({
  updateOrganizationsForm: {
    onSuccess() {
      toastr.success('Organization updated successfully', 'Success');
      if (this.template.data && typeof this.template.data.onSuccess === 'function') {
        this.template.data.onSuccess();
      }
      this.template.parent().data.onSuccess();
      Modal.hide();
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.orgEdit.onCreated(function() {
  console.log(this.data);
  this.subscribe('organizations.single', this.data.orgId);
});

Template.orgEdit.helpers({
  org() {
    return Organizations.findOne(Template.instance().data.orgId);
  }
});
