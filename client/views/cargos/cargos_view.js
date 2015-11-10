Template.cargosView.helpers({
	cargo:function(){
		return Cargos.findOne({_id:FlowRouter.getParam('id')});
	},
	senioridade: function(){
		console.log(this);
		//return Senioridades.findOne({_id: this});
	},
})
