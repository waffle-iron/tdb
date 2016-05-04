AutoForm.hooks({
  'insert-technologies-information-form': {
    onSuccess(formType, result) {
      toastr.success('Technology created successfully', 'Success');

      if (result.insertedId) {
        FlowRouter.go('technologies.edit', { id: result.insertedId });
      }

    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});

Template.technologiesAdd.onCreated(function() {
  this.newTechnology = new ReactiveVar({
    _id: Random.id(),
    status: 'draft'
  });

  this.subscribe('projects.quickList');
  this.subscribe('organizations.quickList');
});

Template.technologiesAdd.helpers({
  tech: () => Template.instance().newTechnology.get()
});
