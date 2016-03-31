// Register all components here
Handlebars.registerPartial('navbar', TDB.templates.navbar());
Handlebars.registerPartial('footer', TDB.templates.footer());
Handlebars.registerPartial('technologyCard', TDB.templates.technologyCard());


// Register routes (route, templateName)
TDBRouter.addRoute('', 'mainDashboard');
TDBRouter.addRoute('index', 'mainDashboard');
TDBRouter.addRoute('#/technologiesDashboard', 'technologiesDashboard');
