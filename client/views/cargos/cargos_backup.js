Template._cargosBackup.helpers({
	verDetalhes: function(){
		return Template.instance().verBackup.get()==this._id;
	},
	classificacao:function(){
		return Classificacoes.findOne({_id: Template.instance().data.classificacaoId});
	},
	beforeRemove: function () {
      return function (collection, id) {
		var object = this;
		bootbox.confirm({
			message: "Tem Certeza?",
			size: "small",
			backdrop:false,
			callback: function(result) {
		  		if (result) object.remove();
		  	}
		});	 
      };
    },
    onSuccess: function(){
    	return function(result){
    		toastr.success("Backup removido com sucesso", "Sucesso");
    	}
    }	
})

Template.removerBackup.onRendered(function(){
	var data = this.data;
	/*
	console.log(this.$('#deletar').get(0));
	$(this.$('#deletar').get(0)).confirmation({
		title: "Tem certeza?",
		btnOkLabel: "Sim",
		btnCancelLabel: "Não",
		href: '',
		onConfirm: function(e){
			e.preventDefault();
			console.log(data);
			console.log("aqui!");
			Backups.remove({_id: data._id});
		}
	})
	*/
});

Template._cargosBackup.events({
	'click .ver':function(e, tmpl){
		if (tmpl.verBackup.get()==this._id){
			tmpl.verBackup.set(null);
		}else{
			tmpl.verBackup.set(this._id);	
		}
	},
	'click .recuperar' : function(){
		var obj = {
			
			atribuicoes: this.doc.atribuicoes,
			formacao: this.doc.formacao,
			experiencia: this.doc.experiencia,
			conhecimentos: this.doc.conhecimentos,
			
			versaoId: this._id			
		};

		Classificacoes.update({_id: this.docId},{$set:obj});
	},
	'click .deletar': function(){

	}
})

Template._cargosBackup.onCreated(function(){
	this.verBackup = new ReactiveVar;
})