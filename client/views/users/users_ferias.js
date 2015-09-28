
Template.usersFerias.helpers({
	diasDisponiveis:function(){
		var valor = this.feriasAcumuladas().dias - this.feriasColetivasGozadas().dias - this.feriasPessoaisGozadas().dias;
		var cor = (valor<0) ? 'danger' : 'green';
		return {
			valor:valor,
			cor: cor
		}
	}
})