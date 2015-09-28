var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Folha adicionado com sucesso: " + this.insertDoc.nome, "Sucesso");
    FlowRouter.go('folhas.index');
  },

  // Called when any submit operation fails
  onError: function(formType, error) {

  },
};

AutoForm.hooks({
  "insertFolhasForm": hooksObject
});

Template.folhasAdd.events({
  'click #gerar-folha':function(){
    var mes = Session.get('mesSelecionado');
    var ano = Session.get('anoSelecionado');
    
    var data = new moment([ano,mes]).toDate();
    console.log(data);
    Folhas.insert({data:data,ano:ano,mes:mes});
  }
})
Template.folhasAdd.helpers({
  totalUsuarios:function(){
    return Roles.getUsersInRole(['admin','socio','gestor','funcionario']).count();
  },
	totalPagamentos:function(){
		return Meteor.users.find({'info.remunerado':true}).count();

	}
})
