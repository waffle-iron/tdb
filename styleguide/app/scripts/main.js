// Register all components here
Handlebars.registerPartial('navbar', TDB.templates.navbar);
Handlebars.registerPartial('footer', TDB.templates.footer);
Handlebars.registerPartial('technologyCard', TDB.templates.technologyCard);
Handlebars.registerPartial('projectCard', TDB.templates.projectCard);
Handlebars.registerPartial('attachmentCard', TDB.templates.attachmentCard);
Handlebars.registerPartial('organizationCard', TDB.templates.organizationCard);

// Helpers
function initMansory() {
  $('.cards-box').masonry({
    // options
    columnWidth: '.cards-size',
    gutter: 15,
    percentPosition: true
  });
}

// Register routes
TDBRouter.addRoute({
  path: '',
  template: 'mainDashboard'
});

TDBRouter.addRoute({
  path: '/technologiesDashboard',
  template: 'technologiesDashboard',
  onRendered: initMansory,
  context: {
    technologies: [{
      name: 'Drone Delivery',
      description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
      src: '../images/technology.jpg'
    }, {
      name: 'Drone Delivery',
      description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
      src: '../images/technology.jpg'
    }]
  }
});

// Finish this
// TDBRouter.addRoute('technologiesDashboard', initMansory);
// TDBRouter.addRoute('attachmentsDashboard', initMansory);
// TDBRouter.addRoute('projectsDashboard', initMansory);
// TDBRouter.addRoute('organizationsDashboard', initMansory);

