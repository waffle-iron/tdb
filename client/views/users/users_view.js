Template.usersView.helpers({
  user: function() {
    let user = Meteor.users.findOne({
      _id: FlowRouter.getParam('id')
    });

    return user;
  },
  userSelector() {
    return {
      userId: FlowRouter.getParam('id')
    };
  }
});

Template.usersView.events({
  'click #change-profile-image': function() {
    Modal.show('usersChangeImage');
  },
  'click #change-role': function() {
    // must implement
  }
});

Template.usersView.onCreated(function() {
  this.autorun(() => {
    let userId = FlowRouter.getParam('id');
    this.subscribe('singleUser', userId);
  });
});
