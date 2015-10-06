var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    console.log(this.currentDoc);
    console.log(this.updateDoc);
    toastr.success("Usuário editado com sucesso: " + this.updateDoc.$set['profile.nome'], "Sucesso");
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
    toastr.error(error,"Erro");
  },

};

AutoForm.hooks({
  "updateUsersProfileForm": hooksObject,
  "updateUsersInfoForm": hooksObject,
});




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
