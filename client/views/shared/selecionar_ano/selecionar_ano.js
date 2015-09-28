var id;

Template.selecionarAno.events({
	'click .ano-anterior':function(){
		Session.set(id,Session.get(id)-1);
	},
	'click .ano-seguinte':function(){
		Session.set(id,Session.get(id)+1);
	},
	'click .set-ano':function(){
		Session.set(id,this.ano)
	},	
})

Template.selecionarAno.helpers({
	anos:function(){
		var anos =[];
		var anoSelecionado = Session.get(id);
		for (i=-5;i<=5;i++){
			var obj = {}
			obj.ano = anoSelecionado + i;
			if (!i) obj.selecionado = true;
			anos.push(obj);
		}
		return anos;
	},	
	anoAtivo:function(){
		return (Session.get(id)==this.ano)?'active':'';
	},	
})


Template.selecionarAno.onCreated(function(){
	id = this.data.id;
	if (!Session.get(id)) Session.set(id, moment().year());
})