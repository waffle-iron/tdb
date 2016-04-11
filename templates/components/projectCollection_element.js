this["TDB"] = this["TDB"] || {};
this["TDB"]["templates"] = this["TDB"]["templates"] || {};
this["TDB"]["templates"]["projectCollection_element"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "    <div class=\"panel panel-default\">\n      <div class=\"panel-heading\">"
    + alias4(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"title","hash":{},"data":data}) : helper)))
    + "</div>\n      <div class=\"panel-body\">\n        <p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n        <ul class=\"sortable-list connectList agile-list\">\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.subCollection : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n      </div>\n      <div class=\"panel-footer\">\n        <div class=\"ibox-tools\">\n          <a href=\"#\" alt=\"Edit Collection\"><i class=\"fa fa-edit\"></i></a>\n          <a href=\"#\" alt=\"Copy collection\"><i class=\"fa fa-copy\"></i></a>\n          <a href=\"#\" alt=\"Delete Collection\"><i class=\"fa fa-trash\"></i></a>\n        </div>\n      </div>\n    </div>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=container.escapeExpression;

  return "          <li>"
    + alias1(((helper = (helper = helpers.title || (depth0 != null ? depth0.title : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : {},{"name":"title","hash":{},"data":data}) : helper)))
    + " <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\"> "
    + alias1(container.lambda(((stack1 = (depth0 != null ? depth0.technologies : depth0)) != null ? stack1.length : stack1), depth0))
    + "</a></li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"ibox collection-ibox\">\n  <div class=\"ibox-title\">\n    <h2>"
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h2>\n    <div class=\"ibox-tools\">\n      <a href=\"#/projects/collection\">Browse</a>\n    </div>\n  </div>\n  <div class=\"ibox-content collectionSetBox\">\n    <p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.collection : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n</div>\n";
},"useData":true});;