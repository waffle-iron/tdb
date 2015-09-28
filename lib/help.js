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
			spanClass = 'text-god';
			texto =  'God';
		break;
		case 'admin':
			spanClass = 'text-danger';
			texto =  'Administrador';			
		break;
		case 'gestor':
			
			spanClass = 'text-info';
			texto =  'Gestor';			
		break;
		case 'socio':
			spanClass = 'text-warning';
			texto =  'Sócio';			
		break;				
		case 'funcionario':
			spanClass = 'text-primary';
			texto =  'Funcionário';			
		break;				
	}	

	return (cor) ? '<span class="' + spanClass  + '">' + texto + '</span>' : texto;
}