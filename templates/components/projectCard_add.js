this["TDB"] = this["TDB"] || {};
this["TDB"]["templates"] = this["TDB"]["templates"] || {};
this["TDB"]["templates"]["projectCard_add"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "<div class=\"ibox card-box cards-item\">\n  <div class=\"ibox-content no-padding card-label\">\n    <img src=\""
    + alias4(((helper = (helper = helpers.src || (depth0 != null ? depth0.src : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"src","hash":{},"data":data}) : helper)))
    + "\" class=\"img-responsive\" />\n    <div class=\"card-description\">\n      <h5 class=\"card-name\"><span class=\"card-id\">"
    + alias4(((helper = (helper = helpers.evID || (depth0 != null ? depth0.evID : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"evID","hash":{},"data":data}) : helper)))
    + "</span> "
    + alias4(((helper = (helper = helpers.name || (depth0 != null ? depth0.name : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data}) : helper)))
    + "</h5>\n      <p>"
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + "</p>\n    </div>\n  </div>\n</div>";
},"useData":true});;