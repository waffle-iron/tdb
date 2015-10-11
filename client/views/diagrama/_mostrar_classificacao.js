Template._mostrarClassificacao.helpers({
	classificacao:function(){
		return Classificacoes.findOne({_id:this.classificacaoId});
	},
	titulo:function(){
		return this.cargo().nome + " " + this.senioridade().nome;
	},
	subtitulo:function(){
		return this.cargo().carreira().nome;
	},
	avatar:function(){
		return this.cargo().carreira().avatar;
	}
})

Template._mostrarClassificacao.onRendered(function(){
	
})