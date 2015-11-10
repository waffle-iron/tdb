//
// Hooks
//
Template.cargosClassificacoes.onCreated(function(){
	var senioridadesPossiveis = this.data.senioridadesPossiveis().fetch()
	if (senioridadesPossiveis.length){
		Session.set('senioridade-selecionada', senioridadesPossiveis[0]._id)
	}
});
//
// Events
//
Template.cargosClassificacoes.events({
	'click .edit': function(){
		FlowRouter.setQueryParams({edit:true});
	},
	'click .cancelar-edit':function(){
		FlowRouter.setQueryParams({edit:null});
	},
	'click .abrir-backup':function(){
		Modal.show('_cargosBackup',{classificacaoId: this._id});
	},
	'click .seleciona-senioridade': function(){
		if (FlowRouter.getQueryParam('edit') && Session.get('senioridade-selecionada')!=this._id){
			FlowRouter.setQueryParams({edit:null});
		}
		Session.set('senioridade-selecionada', this._id);
	}
})


//
// Helpers
//
Template.cargosClassificacoes.helpers({
	classificacao:function(){
		var cargoId = FlowRouter.getParam('id');
		var senioridadeId = Session.get('senioridade-selecionada');
		return Classificacoes.findOne({senioridadeId: senioridadeId, cargoId: cargoId})
	},
	edit:function(){
		return FlowRouter.getQueryParam('edit');
	},
	selecionada: function(){
		return Session.get('senioridade-selecionada')==this._id;
	},
	beforeRemove: function () {
      return function (collection, id) {
        var object = this;
		alertify.confirm('Remover?', function(){
			object.remove();
		}).set('title', 'Confirmar');
      };
    },
    onSuccess: function(){
    	return function(result){
    		toastr.success("Backup removido com sucesso", "Sucesso");
    	}
    }	
})


//
// Insert Form
//
var hooksObjectInsert = {
	before:{
		insert: function(doc){
			doc.cargoId = FlowRouter.getParam('id')
			doc.senioridadeId = Session.get('senioridade-selecionada');
			return doc;
		}
	},
	onSuccess: function(formType, result) {
		toastr.success("Classificação adicionada com sucesso", "Sucesso");
	},
	onError: function(formType, error) {
		toastr.error(error, "Error");
	},
};

AutoForm.hooks({
	"insertClassificacoesForm": hooksObjectInsert
})


//
// Update Form
//
var hooksObjectUpdate = {
  // Called when any submit operation succeeds
  onSuccess: function(formType, result) {
    toastr.success("Classificação editada com sucesso", "Sucesso");
    FlowRouter.setQueryParams({edit: null});
  },

  // Called when any submit operation fails
  onError: function(formType, error) {
  	console.log(error);
  },
};

AutoForm.hooks({
  "updateClassificacoesForm": hooksObjectUpdate
});
