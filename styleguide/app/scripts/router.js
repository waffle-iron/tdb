var TDBRouter = {
  routes: [],
  rootElement: document.querySelector('#main'),

  _getTemplateName: function(hash) {
    var templateName;
    this.routes.forEach(function(route) {
      if (route.hash === window.location.hash) {
        templateName = route.templateName;
      }
    });
    return templateName || 'notFound';
  },

  addRoute: function(hash, templateName) {
    this.routes.push({
      hash: hash,
      templateName: templateName
    });
    return this.routes;
  },

  render: function(hash) {
    var template = TDB.templates[this._getTemplateName(hash)];
    this.rootElement.innerHTML = template();
  }
}

$(document).ready(function() {
  TDBRouter.render(window.location.hash);
});

$(window).bind("hashchange", function() {
  TDBRouter.render(window.location.hash);
});

