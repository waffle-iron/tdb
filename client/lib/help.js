viewItem = function(route, value, objectId){
	return new Spacebars.SafeString('<a href="'+Router.routes[route].path({_id:objectId})+'">' + value + '</a>');
}

toHumanDate = function(date){
	return moment(date).format("DD/MM/YYYY");
}
