Template.technologiesEditDescriptions.helpers({
  isFirstItem: (index) => index === 0,
  isStatusPublished: (status) => status === 'published',
});

Template.technologiesEditDescriptions.events({
  'click [data-action="publish-description"]': function() {
    swal({
      title: 'Are you sure?',
      text: 'Confirm to publish this description. This will set the current pulished description to <b>draft</b>.',
      type: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      closeOnConfirm: true,
      html: true
    }, () => {
      Meteor.call('Technologies.methods.publishDescription', this._id, (err, res) => {
        if (err) toastr.error(err.error, 'Success');
        toastr.success('The description was published!', 'Success');
      });
    });
  },
  'click [data-action="delete-description"]': function() {
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
      Meteor.call('Technologies.methods.deleteDescription', this._id, (err, res) => {
        if (err) toastr.error(err.error, 'Success');
        toastr.success('The description was deleted!', 'Success');
      });
    });
  }
});
