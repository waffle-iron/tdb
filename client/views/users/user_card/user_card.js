Template.userCard.events({
  'click .link': function(e, t) {
    //FlowRouter.go(t.data.link);
  }
});
Template.userCard.onCreated(function() {
  console.log(this);
  this.subscribe('user.status', this.data._id);
});
Template.userCard.helpers({
  user() {
    return Meteor.users.findOne({_id: Template.instance().data._id});
  }
});
