Template._mostrarClassificacao.helpers({
	classificacao:function(){
		return Classificacoes.findOne({_id:this.classificacaoId});
	},
	titulo:function(){
		if (this.cargo().carreira().coordenador){
			return this.cargo().nome;
		}else{
			return this.cargo().nome + " " + "<i>" + this.senioridade().abreviacao + "</i>";	
		}
		
	},
	subtitulo:function(){
		return this.cargo().carreira().nome;
	},
	avatar:function(){
		return '/img/carreiras/64/' + this.cargo().carreira().avatar;
	}
})

Template._mostrarClassificacao.onRendered(function(){
	
})