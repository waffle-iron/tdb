this["TDB"] = this["TDB"] || {};
this["TDB"]["templates"] = this["TDB"]["templates"] || {};
this["TDB"]["templates"]["projectCollection"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.technologyCard,depth0,{"name":"technologyCard","data":data,"indent":"          ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "      <div class=\"col-lg-9\" style=\"width: 937px;\">\n        <div class=\"ibox\">\n          <div class=\"ibox-title\">\n            <h5>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h5>\n            <!-- Collection name  -->\n            <div class=\"ibox-tools\">\n              <a class=\"#\"><i class=\"fa fa-chevron-down\"></i></a>\n              <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\"><i class=\"fa fa-gear\"></i></a>\n              <ul class=\"dropdown-menu dropdown-user\">\n                <li><a href=\"#\">Edit Title</a></li>\n                <li><a href=\"#\">Edit Description</a></li>\n              </ul>\n            </div>\n          </div>\n          <div class=\"ibox-content\">\n            <!-- Collection Description -->\n            <p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "\n              <div class=\"collectionsub\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.subCollection : depth0),{"name":"each","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "              </div>\n          </div>\n        </div>\n      </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "                  <div class=\"collectionSubColumn\">\n                    <div class=\"ibox-title\">\n                      <h5>"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</h5>\n                      <!-- Collection name  -->\n                      <div class=\"ibox-tools\">\n                        <a class=\"#\"><i class=\"fa fa-chevron-down\"></i></a>\n                        <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\"><i class=\"fa fa-gear\"></i></a>\n                        <ul class=\"dropdown-menu dropdown-user\">\n                          <li><a href=\"#\">Edit Title</a></li>\n                          <li><a href=\"#\">Edit Description</a></li>\n                        </ul>\n                      </div>\n                    </div>\n                    <div class=\"ibox-content\">\n                      <!-- Collection Description -->\n                      <p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n                    </div>\n                    <div class=\"sortable-list connectList\" id=\"ibox-subcollection\">\n                      <!-- Começo tecnologia -->\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.technologies : depth0),{"name":"each","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "                    </div>\n                  </div>\n";
},"5":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.technologyCard,depth0,{"name":"technologyCard","data":data,"indent":"                        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return ((stack1 = container.invokePartial(partials.navbar,depth0,{"name":"navbar","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<!-- Page wrapper -->\n<div class=\"row border-bottom white-bg page-heading\">\n  <div class=\"col-lg-12\">\n    <ol class=\"breadcrumb\">\n      <li>\n        <a href=\"#/projects\">Projects</a>\n      </li>\n      <li>\n        <a href=\"#/projects/entry\">Futuro da Medicina</a>\n      </li>\n      <li>\n        Collections\n      </li>\n      <li class=\"active\">\n        <strong>"
    + container.escapeExpression(((helper = (helper = helpers.collectionName || (depth0 != null ? depth0.collectionName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"collectionName","hash":{},"data":data}) : helper)))
    + "</strong>\n      </li>\n    </ol>\n  </div>\n</div>\n<div class=\"wrapper wrapper-content animated fadeInRight\" id=\"main-content\">\n  <div class=\"row tooltip-demo\">\n    <div id=\"techStash\">\n      <div class=\"panel-heading\">\n        <div class=\"input-group\">\n          <input type=\"text\" placeholder=\"Search for a technology.\" class=\"input input-sm form-control\">\n          <span class=\"input-group-btn\">\n         <button type=\"button\" class=\"btn btn-sm btn-white\"> <i class=\"fa fa-plus\"></i> Add</button>\n                                    </span>\n        </div>\n      </div>\n      <div class=\"panel-body sortable-list connectList\" id=\"ibox-technologystash\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.technologiesStash : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      </div>\n    </div>\n    <!-- COMEÇO de coleção -->\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.collection : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n";
},"usePartial":true,"useData":true});;