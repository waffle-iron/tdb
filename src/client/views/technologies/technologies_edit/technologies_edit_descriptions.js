Template.technologiesEditDescriptions.onCreated(function() {
  this.isEditing = new ReactiveVar;
  this.currentDescription = new ReactiveVar(this.data.getPublishedDescription());
});

Template.technologiesEditDescriptions.events({
  'click [data-action="toggle-form"]': function(event, template) {
    template.isEditing.set(true);
  },
  'click [data-toggle="tab"]': function(event, template) {
    template.currentDescription.set(this);
    template.isEditing.set(false);
  },
  'click [data-action="publish-description"]': function(event, template) {
    swal({
      title: 'Are you sure?',
      text: 'Confirm to publish this description. This will set the current pulished description to <b>draft</b>.',
      type: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      closeOnConfirm: true,
      html: true
    }, () => {
      Meteor.call('Technologies.methods.publishDescription', template.currentDescription.get()._id, (err, res) => {
        if (err) toastr.error(err.error, 'Success');
        toastr.success('The description was published!', 'Success');
      });
    });
  },
  'click [data-action="delete-description"]': function(event, template) {
    swal({
      title: 'Are you sure?',
      text: "Confirm to delete this description. This action can't be undone",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#DD6B55',
      closeOnConfirm: true,
      html: true
    }, () => {
      Meteor.call('Technologies.methods.deleteDescription', template.currentDescription.get()._id, (err, res) => {
        if (err) toastr.error(err.error, 'Success');
        toastr.success('The description was deleted!', 'Success');
      });
    });
  }
});

Template.technologiesEditDescriptions.helpers({
  isFirstItem: (index) => index === 0,
  isEditing: () => Template.instance().isEditing.get(),
  isStatusPublished: (status) => status === 'published',
  currentDescription: () => Template.instance().currentDescription.get(),
});
