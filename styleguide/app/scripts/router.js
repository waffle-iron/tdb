'use strict';

var TDBRouter = {
  routes: [],
  rootElement: document.querySelector('#main'),

  getRouteByHash: function(hash) {
    var route;
    this.routes.forEach(function(r) {
      if (r.hash === window.location.hash) {
        route = r;
      }
    });
    return route;
  },

  addRoute: function(hash, templateName, callback) {
    this.routes.push({
      hash: hash,
      templateName: templateName,
      callback: callback || ()
    });
    return this.routes;
  },

  render: function(hash) {
    var route = this.getRouteByHash(hash);
    if (route) {
      this.rootElement.innerHTML = TDB.templates[route.templateName]();
      window.setTimeout(route.callback, 0);
      }, 0)
    } else {
      this.rootElement.innerHTML = TDB.templates.notFound();
    }
  }
};

$(document).ready(function() {
  TDBRouter.render(window.location.hash);
});

$(window).bind("hashchange", function() {
  TDBRouter.render(window.location.hash);
});

