Template.userCard.helpers({
  genderIcon() {
    if (this && this.gender) {
      return this.gender === 'Male' ? 'fa fa-mars' : 'fa fa-venus';
    }
    return 'fa fa-question';
  }
});


Template.userCard.events({
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
