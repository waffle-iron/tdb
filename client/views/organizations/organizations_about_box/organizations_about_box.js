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
  }
});
