this["TDB"] = this["TDB"] || {};
this["TDB"]["templates"] = this["TDB"]["templates"] || {};
this["TDB"]["templates"]["latestUpdates"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "            <li class=\"list-group-item\">\n              <a href=\""
    + alias4(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" class=\"label label-success\"><i class=\"icon fa fa-"
    + alias4(((helper = (helper = helpers.type || (depth0 != null ? depth0.type : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"type","hash":{},"data":data}) : helper)))
    + "\"></i> "
    + alias4(((helper = (helper = helpers.object || (depth0 != null ? depth0.object : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"object","hash":{},"data":data}) : helper)))
    + "</a>\n              <p>"
    + alias4(((helper = (helper = helpers.action || (depth0 != null ? depth0.action : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"action","hash":{},"data":data}) : helper)))
    + " <a href=\"#/users/entry\"> "
    + alias4(((helper = (helper = helpers.author || (depth0 != null ? depth0.author : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"author","hash":{},"data":data}) : helper)))
    + "</a></p>\n              <span class=\"label label-primary label-time\">"
    + alias4(((helper = (helper = helpers.time || (depth0 != null ? depth0.time : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"time","hash":{},"data":data}) : helper)))
    + "</span>\n            </li>\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return "\n  <div class=\"ibox float-e-margins recent-updates\">\n    <div class=\"ibox-title\">\n      <h1><i class=\"fa fa-bell\"></i>Latest Updates</h1>\n    </div>\n    <div class=\"ibox-content no-padding\">\n      <div class=\"ps-container ps-active-y\" data-ps-id=\"bfec20ef-6bd4-83ea-d878-a97cfeaaefe8\">\n        <ul class=\"list-group\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.latestUpdates : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n        <div class=\"ps-scrollbar-x-rail\" style=\"left: 0px; bottom: 3px;\">\n          <div class=\"ps-scrollbar-x\" style=\"left: 0px; width: 0px;\"></div>\n        </div>\n        <div class=\"ps-scrollbar-y-rail\" style=\"top: 0px; right: 3px; height: 142px;\">\n          <div class=\"ps-scrollbar-y\" style=\"top: 0px; height: 60px;\"></div>\n        </div>\n      </div>\n      <!--</div>-->\n    </div>\n    <div class=\"ibox-footer\">\n      <span class=\"pull-right\"><a class=\"text-info\" id=\"view-more\">View more... (40 / 128)</a></span>\n      <a class=\"text-info\" id=\"view-less\">View less</a>\n    </div>\n  </div>\n";
},"useData":true});;