Template.cargosClassificacoes.onRendered(function(){
	//this.cargoId = this.data.cargoId;

})

Template.cargosClassificacoes.helpers({
	classificacao:function(){
		var cargoId = Template.instance().data.cargoId;

		return Classificacoes.findOne({senioridadeId: this._id, cargoId: cargoId})
	},
	cargo:function(){
		var cargoId = Template.instance().data.cargoId;
		
		
		return Cargos.findOne({_id: cargoId}) || false;
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