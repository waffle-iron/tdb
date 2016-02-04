const IMAGE_ASPECT_RATIO = 1;

Template.orgAboutBox.events({
  'click #add-people': function() {
    Modal.show('addKeyPeople', {
      org: this
    });
  },
  'click #org-edit': function() {
    Modal.show('orgEdit', {
      orgId: this._id
    });
  },
  'click .change-logo-image': function() {
    Modal.show('uploadFile', {
      onUpload(file) {
        Meteor.call('Organizations.methods.setLogo', FlowRouter.getParam('id'), file._id);
      },
      aspectRatio: IMAGE_ASPECT_RATIO
    });
  }
});
