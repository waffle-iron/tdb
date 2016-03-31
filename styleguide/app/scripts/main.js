// Register all components here
Handlebars.registerPartial('navbar', TDB.templates.navbar());
Handlebars.registerPartial('footer', TDB.templates.footer());
Handlebars.registerPartial('technologyCard', TDB.templates.technologyCard());
Handlebars.registerPartial('projectCard', TDB.templates.projectCard());
Handlebars.registerPartial('attachmentCard', TDB.templates.attachmentCard());
Handlebars.registerPartial('organizationCard', TDB.templates.organizationCard());


// Register routes (hash, templateName, initCallback)
TDBRouter.addRoute('', 'mainDashboard');
TDBRouter.addRoute('#/technologiesDashboard','technologiesDashboard', () => {
  $('.cards-box').masonry({
    // options
    columnWidth: '.cards-size',
    gutter: 15,
    percentPosition: true
  });
});

TDBRouter.addRoute('#/attachmentsDashboard','attachmentsDashboard', () => {
  $('.cards-box').masonry({
    // options
    columnWidth: '.cards-size',
    gutter: 15,
    percentPosition: true
  });
});
TDBRouter.addRoute('#/projectsDashboard','projectsDashboard', () => {
  $('.cards-box').masonry({
    // options
    columnWidth: '.cards-size',
    gutter: 15,
    percentPosition: true
  });
});
TDBRouter.addRoute('#/organizationsDashboard','organizationsDashboard', () => {
  $('.cards-box').masonry({
    // options
    columnWidth: '.cards-size',
    gutter: 15,
    percentPosition: true
  });
});
