Template.usersEntry.helpers({
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

Template.usersEntry.events({
  'click #change-profile-image': function() {
    Modal.show('usersChangeImage');
  },
});

Template.usersEntry.onCreated(function() {
  this.autorun(() => {
    let userId = FlowRouter.getParam('id');
    this.subscribe('singleUser', userId);
  });
});
