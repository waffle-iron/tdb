Template.orgAboutBox.events({
  'click #add-people': function() {
    Modal.show('addKeyPeople', {
      org: this
    });
  },
  'click #org-edit': function() {
    console.log('aqui!');
    Modal.show('orgEdit', {
      org: this
    });
  }
});
