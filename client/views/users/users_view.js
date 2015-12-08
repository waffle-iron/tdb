Template.usersView.helpers({
  user: function() {
    let user = Meteor.users.findOne({
      _id: FlowRouter.getParam('id')
    });

    return user;
  },
  editingProfile: function() {
    return Session.get('editingProfile');
  }
});

Template.usersView.events({
  'click #change-profile-image': function(){
    Modal.show('usersChangeImage');
  },
  'click #escolher-grupo': function() {
    Modal.show('_usersEscolherGrupo', {
      _id: FlowRouter.getParam('id')
    });
  },
  'click #btn-edit-profile': function() {
    Session.set('editingProfile', !Session.get('editingProfile'));
  }
});

Template.usersView.onCreated(function() {
  Session.setDefault('editingProfile', false);
});
