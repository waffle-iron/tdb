// Register all components here
Handlebars.registerPartial('navbar', TDB.templates.navbar);
Handlebars.registerPartial('footer', TDB.templates.footer);
Handlebars.registerPartial('technologyCard', TDB.templates.technologyCard);
Handlebars.registerPartial('projectCard', TDB.templates.projectCard);
Handlebars.registerPartial('attachmentCard', TDB.templates.attachmentCard);
Handlebars.registerPartial('organizationCard', TDB.templates.organizationCard);
Handlebars.registerPartial('latestUpdates', TDB.templates.latestUpdates);

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
  path: '/technologies/',
  template: 'technologiesDashboard',
  onRendered: initMansory,
  context: {
    technologies: [{
      name: 'Drone Delivery',
      description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
      src: '../images/technology.jpg'
    }, {
      name: 'Other cool technology',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
      src: '../images/organization.png'
    }],
    latestUpdates: [{
    	object: 'Drone Delivery',
    	type:'gear',
    	url: '#/technologies/entry',
    	action:'was created',
    	author:'Arthur Soares',
    	time:'5 min'
    }]
  }
});

TDBRouter.addRoute({
  path: '/attachments/',
  template: 'attachmentsDashboard',
  onRendered: initMansory,
  context: {
    attachments: [{
      name: 'Drone Delivery',
      description: 'Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage',
      src: '../images/attachment.jpg',
      type: 'Media'
    }, {
      name: 'Other cool technology',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
      src: '../images/organization.png',
      type: 'Article'
    }, {
      name: 'Other cool technology',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat sapiente ipsa et voluptatum quibusdam temporibus veniam facilis praesentium nostrum, beatae sint quod earum quis, quos, delectus voluptatem sunt deleniti est.',
      src: '../images/organization.png',
      type: 'Article'
    }],
    latestUpdates: [{
    	object: 'Drone Delivery',
    	type:'gear',
    	url: '#/technologies/entry',
    	action:'was created',
    	author:'Arthur Soares',
    	time:'5 min'
    }]
  }
});

TDBRouter.addRoute({
  path: '/projects/',
  template: 'projectsDashboard',
  onRendered: initMansory,
  context: {
    projects: [{
      name: 'Futuro da Medicina',
      evID: 'EV0091',
      description: 'Futuro da Medicina is a content platform that is being developed for OneHealth since 2013. It started with some visualizations back in 2011. Our main contact is Dr. Sergio, CEO.',
      src: '../images/project.png',
      status: 'Active'
    }],
    latestUpdates: [{
    	object: 'Futuro da Medicina',
    	type:'folder',
    	url: '#/projects/entry',
    	action:'was created',
    	author:'Arthur Soares',
    	time:'5 min'
    }]
  }
});

// Finish this
// TDBRouter.addRoute('technologiesDashboard', initMansory);
// TDBRouter.addRoute('projectsDashboard', initMansory);
// TDBRouter.addRoute('organizationsDashboard', initMansory);

