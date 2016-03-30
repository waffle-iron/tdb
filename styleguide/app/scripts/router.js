var TDBRouter = {
  routes: [],
  rootElement: document.querySelector('#main'),

  addRoute: function(hash, templateName) {
    this.routes.push({
      hash: hash,
      templateName: templateName
    });
    return this.routes;
  },
  render: function(hash) {
    var self = this;
    this.routes.forEach(function(route) {
      if (route.hash === window.location.hash) {
        self.rootElement.innerHTML = TDB.templates[route.templateName]();
      }
    })
  }
}

$(document).ready(function() {
  TDBRouter.render(window.location.hash);
});

$(window).bind("hashchange", function() {
  TDBRouter.render(window.location.hash);
});