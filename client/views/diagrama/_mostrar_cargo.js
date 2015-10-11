Template._mostrarCargo.helpers({
	cargo:function(){
		return Cargos.findOne({_id: this.cargoId});
	}
})