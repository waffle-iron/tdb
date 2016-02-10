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
  'click #change-profile-image': function() {
    Modal.show('uploadFile', {
      onStartUpload(file) {},
      onUpload(file) {
        toastr.success('Upload finished', 'Success');
        Meteor.call('Users.methods.setUserImage', FlowRouter.getParam('id'), file._id);
      },
      crop: false
    });
  }
});
