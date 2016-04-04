'use strict';

var TDBRouter = {
  routes: [],
  rootElement: document.querySelector('#main'),
  getRouteByHash: function getRouteByHash(hash) {
    return this.routes.find(function (r) {
      return r.path === hash.substring(1);
    });
  },
  addRoute: function addRoute(_ref) {
    var path = _ref.path;
    var template = _ref.template;
    var onRendered = _ref.onRendered;
    var context = _ref.context;

    return this.routes.push({ path: path, template: template, onRendered: onRendered, context: context });
  },
  render: function render(hash) {
    var route = this.getRouteByHash(hash);
    if (route) {
      this.rootElement.innerHTML = TDB.templates[route.template](route.context);
      window.setTimeout(route.onRendered, 0);
    } else {
      this.rootElement.innerHTML = TDB.templates.notFound();
    }
  }
};

$(document).ready(function () {
  TDBRouter.render(window.location.hash);
});

$(window).bind("hashchange", function () {
  TDBRouter.render(window.location.hash);
});
//# sourceMappingURL=router.js.map
