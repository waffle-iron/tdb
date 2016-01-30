Template.userCard.helpers({
  
});


Template.userCard.events({
  'click #manage-user-role': function(e) {
    e.preventDefault();
    console.log('ok');
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
  }
});
