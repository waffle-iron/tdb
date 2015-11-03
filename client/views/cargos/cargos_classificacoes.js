Template.cargosClassificacoes.onRendered(function(){
	//this.cargoId = this.data.cargoId;

})

Template.cargosClassificacoes.events({
	'click .edit': function(){
		FlowRouter.setQueryParams({edit:true});
	}
})

Template.cargosClassificacoes.helpers({
	classificacao:function(){
		var cargoId = Template.instance().data.cargoId;

		return Classificacoes.findOne({senioridadeId: this._id, cargoId: cargoId})
	},
	cargo:function(){
		var cargoId = Template.instance().data.cargoId;
		
		
		return Cargos.findOne({_id: cargoId}) || false;
	},
	edit:function(){
		return FlowRouter.getQueryParam('edit');
	}
})



var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Classificação adicionada com sucesso", "Sucesso");
  },

  // Called when any submit operation fails
  onError: function(formType, error) {

  },
};

AutoForm.hooks({
  "insertClassificacoesForm": hooksObject
});




var hooksObject = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Classificação editada com sucesso", "Sucesso");
    FlowRouter.setQueryParams({edit: null});
  },

  // Called when any submit operation fails
  onError: function(formType, error) {

  },
};

AutoForm.hooks({
  "updateClassificacoesForm": hooksObject
});