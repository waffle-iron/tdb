Template.techStashItem.helpers({
  getUser() {
    return Meteor.users.findOne({
      _id: this.addedBy
    });
  },
  getTechnology() {
    return Technologies.findOne({
      _id: this.technologyId
    });
  }
});
