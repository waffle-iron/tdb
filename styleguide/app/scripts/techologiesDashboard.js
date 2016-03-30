Handlebars.registerPartial('navbar', TDB.templates.navbar());
Handlebars.registerPartial('technologyCard', TDB.templates.technologyCard());

document.querySelector('#technologiesDashboard').innerHTML = TDB.templates.technologiesDashboard();


$(document).ready(function() {
	// mansonry code here...
});