Template.orgCard.events({
  'click #add-people': function() {
    Modal.show('addKeyPeople', {
      org: this
    });
  }
});
