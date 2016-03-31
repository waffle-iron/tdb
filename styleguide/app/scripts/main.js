// Register all components here
Handlebars.registerPartial('navbar', TDB.templates.navbar());
Handlebars.registerPartial('footer', TDB.templates.footer());
Handlebars.registerPartial('technologyCard', TDB.templates.technologyCard());


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