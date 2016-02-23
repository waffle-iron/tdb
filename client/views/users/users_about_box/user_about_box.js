const IMAGE_ASPECT_RATIO = 1;
Template.userAboutBox.events({
  'click #manage-user-role': function(e) {
    e.preventDefault();
    Modal.show('manageUserRole');
  },
  'click #edit-info': function(e) {
    e.preventDefault();
    Modal.show('editInformation', {
      user: this
    });
  },
  'click #edit-contact': function(e) {
    e.preventDefault();
    Modal.show('editContactInfo', {
      user: this
    });
  },
  'click #edit-bio': function(e) {
    e.preventDefault();
    Modal.show('editBio', {
      user: this
    });
  },
  'click .change-profile-image': function() {
    Modal.show('uploadFile', {
      onStartUpload(file) {},
      onUpload(file) {
        toastr.success('Upload finished', 'Success');
        Meteor.call('Users.methods.setUserImage', FlowRouter.getParam('id'), file._id);
      },
      crop: false
    });
  },
  'click #delete-user': function() {
    swal({
      title: 'Are you sure?',
      text: 'You will not be able to undo this action!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#DD6B55',
      confirmButtonText: 'Yes, delete it!',
      closeOnConfirm: true
    }, () => {
      Meteor.call('Users.methods.remove', this._id, (err, res) => {
        if (err) {
          return toastr.error(err.toString(), 'Error');
        }
        toastr.success('User removed successfully', 'Success');
        FlowRouter.go('users.dashboard');
      });
    });

  },
  'mouseenter .update-picture-icon': function() {
    $('.change-profile-image a').fadeIn();
  },
  'mouseleave .change-profile-image': function() {
    $('.change-profile-image a').fadeOut();
  }
});
