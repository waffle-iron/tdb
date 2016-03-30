// Register all components here
Handlebars.registerPartial('navbar', TDB.templates.navbar());
Handlebars.registerPartial('technologyCard', TDB.templates.technologyCard());


// Register routes here
function render(hash) {
  var main = document.querySelector('#main');

  if (hash === "" || hash === "#") {
    main.innerHTML = TDB.templates.mainDashboard();
  }

  if (hash === "#/technologiesDashboard") {
    main.innerHTML = TDB.templates.technologiesDashboard();
  }
}

// Render on browser reload
$(document).ready(function() {
  render(window.location.hash);
});

$(window).bind("hashchange", function() {
  render(window.location.hash);
})
