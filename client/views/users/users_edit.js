AutoForm.hooks({
  updateUsersProfileForm: {
    onSuccess() {
        toastr.success('User edited successfully', 'Sucesso');
        Session.set('editingProfile', false);
      },
      onError(formType, error) {
        toastr.error(error.toString, 'Erro');
        Session.set('editingProfile', false);
      },
  },
});

Template.usersEdit.helpers({
  user: function() {
    return Meteor.users.findOne({
      _id: FlowRouter.getParam('id')
    });
  },
  getRole: function() {
    var roles = Roles.getRolesForUser(FlowRouter.getParam('id'));
    console.log(roles);
    return roles[0];
  }
});


Template.usersEdit.events({
  'click #cancel': function(e) {
    e.preventDefault();
    Session.set('editingProfile', false);
  }
});
