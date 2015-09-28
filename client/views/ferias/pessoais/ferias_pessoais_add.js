var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Férias Pessoais adicionadas com sucesso.", "Sucesso");
    FlowRouter.go('ferias.pessoais.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
    console.log(error);
  },
};

AutoForm.hooks({
  "insertFeriasPessoaisForm": hooksObject
});

Template.feriasPessoaisAdd.helpers({
  omitFields:function(){
    return (Roles.userIsInRole(Meteor.userId(),['god','admin','gestor']))? '' : 'userId,status';
  }
})