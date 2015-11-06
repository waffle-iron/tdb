viewItem = function(route, value, objectId){
	return new Spacebars.SafeString('<a href="'+Router.routes[route].path({_id:objectId})+'">' + value + '</a>');
}

toHumanDate = function(date){
	return moment(date).format("DD/MM/YYYY");
}

tipoToImg = function(tipo){
	if (!tipo) return 'aes.ico';
	switch(tipo){
		case 1:
			return 'vp.png'
		break;
		case 2:
			return 'dir.png'	
		break;
		case 3:
			return 'ger.png'
		break;
		case 4:
			return 'coord.png'
		break;
	}
}