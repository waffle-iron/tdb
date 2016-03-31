'use strict';

var TDBRouter = {
  routes: [],
  rootElement: document.querySelector('#main'),

  _getRouteByHash: function(hash) {
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
      callback: callback
    });
    return this.routes;
  },

  render: function(hash) {
    var route = this._getRouteByHash(hash);
    if (route){
      this.rootElement.innerHTML = TDB.templates[route.templateName]();
      route.callback && route.callback();
    }else {
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

