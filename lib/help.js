Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {         
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

formatarAreasTipo = function(tipo){
  switch (tipo){
    case 1:
      return "VP";
    break;
    case 2:
      return "Diretoria";
    break;
    case 3:
      return "Gerência";
    break;
    case 4:
      return "Coordenação";
    break;
  }
}

formatarAtivo = function(ativo){
	if (ativo){
		return '<span class="badge badge-primary">ativo</span>';
	}else{
		return '<span class="badge badge-danger">não ativo</span>';
	}
}
formatarData = function(val,format){
	format = format || 'DD/MM/YYYY';
	//complete = complete || false;
	//var string = complete? "DD/MM/YYYY HH:mm:ss"  : "DD/MM/YYYY";


	if (val) {
	  return moment.utc(val).format(format);
	} else {
	  return "indefinido";
	}
}    

formatarReais = function(val){
  return accounting.formatMoney(val, "", 2, ".", ","); 
}

formatarBoolean = function(bool){
	return (bool) ? "Sim" : "Não";
}

formatarRole = function(role, cor){
	if (cor==='false') cor = false;
	cor = cor || false;

	var spanClass = texto = '';
	switch (role){
		case 'god':
			spanClass = 'badge-success';
			texto =  'God';
		break;
		case 'admin':
			spanClass = 'badge-danger';
			texto =  'Administrador';			
		break;
		case 'gestor':
			
			spanClass = 'badge-info';
			texto =  'Gestor';			
		break;
		case 'socio':
			spanClass = 'badge-warning';
			texto =  'Sócio';			
		break;				
		case 'usuario':
			spanClass = 'badge-primary';
			texto =  'Usuário';			
		break;				
	}	

	return (cor) ? '<span class="badge ' + spanClass  + '">' + texto + '</span>' : texto;
}