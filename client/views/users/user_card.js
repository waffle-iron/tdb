Template.userCard.helpers({
  genderIcon() {
    return this.profile.gender === 'Male' ? 'fa fa-mars' : 'fa fa-venus';
  }
});
