var filtros = new ReactiveDict('filtros');
var dep;

constroiFiltro = function(id,fields){
	//var fields = garantirArray(Template.currentData().fields);
	if (!dep) dep = new Deps.Dependency;
	dep.depend();

		var filtro ={}
		_.each(fields,function(field){

			var value = filtros.get('filtro' + id +'.'+field);
			if (value) filtro[field] = value;
		});

		return filtro;
}

var garantirArray = function(context){
	if (context instanceof Array)
		return context;
	else 
		return context.split('|');	
}

Template.filtro.helpers({
	fields:function(){
		return garantirArray(this.fields);
	},
	id: function(){
		return 'filtro' + this.id + 'Form';
	},
	getValue:function(){
		return filtros.get('filtro' + Template.parentData().id + '.'+ this);

		//return Session.get('filtro'+Template.parentData().model+'.'+this);
	}
})

Template.filtro.events({
	'change .filtro':function(e){
		$e = $(e.target);
		console.log('filtro' + Template.currentData().id + "." + this.name, $e.val());
		filtros.set('filtro' + Template.currentData().id + "." + this.name,$e.val());
		dep.changed();
	}
})
