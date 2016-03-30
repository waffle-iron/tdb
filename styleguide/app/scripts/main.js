// Register all components here
Handlebars.registerPartial('navbar', TDB.templates.navbar());
Handlebars.registerPartial('technologyCard', TDB.templates.technologyCard());


// Register routes (route, templateName)
TDBRouter.addRoute('', 'mainDashboard');
TDBRouter.addRoute('#/technologiesDashboard', 'technologiesDashboard');
