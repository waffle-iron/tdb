// Register all components here
Handlebars.registerPartial('navbar', TDB.templates.navbar());
Handlebars.registerPartial('footer', TDB.templates.footer());
Handlebars.registerPartial('technologyCard', TDB.templates.technologyCard());
Handlebars.registerPartial('projectCard', TDB.templates.projectCard());
Handlebars.registerPartial('attachmentCard', TDB.templates.attachmentCard());
Handlebars.registerPartial('organizationCard', TDB.templates.organizationCard());

// Helpers
function initMansory() {
  $('.cards-box').masonry({
    // options
    columnWidth: '.cards-size',
    gutter: 15,
    percentPosition: true
  });
}

// Register routes (hash, templateName, initCallback)
TDBRouter.addRoute('', 'mainDashboard');
TDBRouter.addRoute('#/technologiesDashboard', 'technologiesDashboard', initMansory)
TDBRouter.addRoute('#/attachmentsDashboard', 'attachmentsDashboard', initMansory)
TDBRouter.addRoute('#/projectsDashboard', 'projectsDashboard', initMansory)
TDBRouter.addRoute('#/organizationsDashboard', 'organizationsDashboard', initMansory)

