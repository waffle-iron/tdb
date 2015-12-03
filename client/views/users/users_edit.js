AutoForm.hooks({
  updateUsersProfileForm: {
    onSuccess() {
      toastr.success('User edited successfully', 'Sucesso');
    },
    onError(formType, error) {
      toastr.error(error.toString, 'Erro');
    },
  },
});

/*
Template.usersEdit.helpers({
  user: function(){
    var user =Meteor.users.findOne({_id: FlowRouter.getParam('id')});
    return user;
  },
  getRole:function(){
    var roles = Roles.getRolesForUser(FlowRouter.getParam('id'));
    console.log(roles);
    return roles[0];
  }
})
*/
