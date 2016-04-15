this["TDB"] = this["TDB"] || {};
this["TDB"]["templates"] = this["TDB"]["templates"] || {};
this["TDB"]["templates"]["mainDashboard"] = Handlebars.template({"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return ((stack1 = container.invokePartial(partials.navbar,depth0,{"name":"navbar","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"wrapper-content\">\n  <div class=\"row\">\n    <div class=\"col-xs-6\">\n      <div class=\"row\">\n        <!-- COMEÇO DASH TECH -->\n        <div class=\"col-xs-6\">\n          <div class=\"ibox dashboard-ibox\">\n            <div class=\"ibox-title\">\n              <h2>\n              <i class=\"fa fa-gear\"></i> Technologies\n              </h2>\n            </div>\n            <div class=\"ibox-content\">\n              <p><a href=\"#/technologies/add\" class=\"btn btn-block btn-primary\">Add a new technology</a></p>\n              <table class=\"table\">\n                <tbody>\n                  <tr>\n                    <td>\n                      We have <strong>123</strong> Technologies in TDB\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      <strong>80</strong> of them are <a href=\"\" class=\"label label-primary\">Published</a>\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      <strong>20</strong> of them are <a href=\"\" class=\"label label-warning\">Under Review</a>\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      <strong>05</strong> of them are <a href=\"\" class=\"label label-danger\">Drafts</a>\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      The newest one is <a href=\"\" class=\"label label-danger\"><i class=\"fa fa-gear\"></i> 3D touch sensitive screens</a>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        </div>\n        <!-- COMEÇO DASH PROJECTS -->\n        <div class=\"col-xs-6\">\n          <div class=\"ibox dashboard-ibox\">\n            <div class=\"ibox-title\">\n              <h2>\n              <i class=\"fa fa-folder\"></i> Projects\n              </h2>\n            </div>\n            <div class=\"ibox-content\">\n              <p><a href=\"/organizations/add\" class=\"btn btn-block btn-primary\">Add a new project</a></p>\n              <table class=\"table\">\n                <tbody>\n                  <tr>\n                    <td>\n                      We have <strong>23</strong> Projects in TDB\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      <strong>80</strong> of them are active\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      <strong>20</strong> of them are prospect\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      <strong>05</strong> of them are closed\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      The newest one is <a href=\"\" class=\"label label-outline\"><i class=\"fa fa-folder\"></i> Futuro da Medicina</a>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"row\">\n        <!-- COMEÇO DASH ORG -->\n        <div class=\"col-xs-6\">\n          <div class=\"ibox dashboard-ibox\">\n            <div class=\"ibox-title\">\n              <h2>\n              <i class=\"fa fa-building\"></i> Organizations\n              </h2>\n            </div>\n            <div class=\"ibox-content\">\n              <p><a href=\"/organizations/add\" class=\"btn btn-block btn-primary\">Add a new organization</a></p>\n              <table class=\"table\">\n                <tbody>\n                  <tr>\n                    <td>\n                      We have <strong>13</strong> organizations in TDB\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      The newest one is <a href=\"\" class=\"label label-outline\"><i class=\"icon fa fa-building\"></i> Tesla Motors</a>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        </div>\n        <!-- COMEÇO DASH ATTACH -->\n        <div class=\"col-xs-6\">\n          <div class=\"ibox dashboard-ibox\">\n            <div class=\"ibox-title\">\n              <h2>\n              <i class=\"fa fa-paperclip\"></i> Attachments\n              </h2>\n            </div>\n            <div class=\"ibox-content\">\n              <p><a href=\"/organizations/add\" class=\"btn btn-block btn-primary\">Add a new attachment</a></p>\n              <table class=\"table\">\n                <tbody>\n                  <tr>\n                    <td>\n                      We have <strong>23</strong> attachments in TDB\n                    </td>\n                  </tr>\n                  <tr>\n                    <td>\n                      The newest one is <a href=\"\" class=\"label label-outline\"><i class=\"fa fa-paperclip\"></i> Sky Blue Sky</a>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n    <!-- Início tech stash -->\n    <div class=\"col-sm-12 col-md-12 col-lg-6\">\n      <div class=\"row\">\n        <div class=\"col-xs-12\">\n          <div class=\"ibox float-e-margins recent-updates\">\n            <div class=\"ibox-title\">\n              <h1><i class=\"fa fa-bell\"></i> Latest Updates</h1>\n            </div>\n            <div class=\"ibox-content no-padding\">\n              <div class=\"ps-container\" data-ps-id=\"5af3b930-2851-eeab-0e0c-45d8f9727f08\">\n                <ul class=\"list-group\">\n                  <li class=\"list-group-item\">\n                    <a href=\"/users/uN5avEbvacZYpuWB3/entry\" class=\"label label-default\">\n                      <i class=\"icon fa fa-users\"></i> c.haverslag@dynteq.nl\n                    </a>\n                    <p>\n                      was updated by\n                      <!--was "
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + " by-->\n                      <a href=\"/users/entry\">\n                      </a>\n                    </p>\n                    <span class=\"label label-primary label-time\">\n            4 days ago\n          </span>\n                  </li>\n                  <li class=\"list-group-item\">\n                    <a href=\"/users/uN5avEbvacZYpuWB3/entry\" class=\"label label-default\">\n                      <i class=\"icon fa fa-users\"></i> c.haverslag@dynteq.nl\n                    </a>\n                    <p>\n                      was updated by\n                      <!--was "
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + " by-->\n                      <a href=\"/users/entry\">\n                      </a>\n                    </p>\n                    <span class=\"label label-primary label-time\">\n            4 days ago\n          </span>\n                  </li>\n                  <li class=\"list-group-item\">\n                    <a href=\"/users/uN5avEbvacZYpuWB3/entry\" class=\"label label-default\">\n                      <i class=\"icon fa fa-users\"></i> c.haverslag@dynteq.nl\n                    </a>\n                    <p>\n                      was inserted by\n                      <!--was "
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + " by-->\n                      <a href=\"/users/entry\">\n                      </a>\n                    </p>\n                    <span class=\"label label-primary label-time\">\n            4 days ago\n          </span>\n                  </li>\n                  <li class=\"list-group-item\">\n                    <a href=\"/users/7mo8rDpaK5Luoqxai/entry\" class=\"label label-default\">\n                      <i class=\"icon fa fa-users\"></i> ola@methodkit.com\n                    </a>\n                    <p>\n                      was updated by\n                      <!--was "
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + " by-->\n                      <a href=\"/users/entry\">\n                      </a>\n                    </p>\n                    <span class=\"label label-primary label-time\">\n            5 days ago\n          </span>\n                  </li>\n                  <li class=\"list-group-item\">\n                    <a href=\"/users/7mo8rDpaK5Luoqxai/entry\" class=\"label label-default\">\n                      <i class=\"icon fa fa-users\"></i> ola@methodkit.com\n                    </a>\n                    <p>\n                      was updated by\n                      <!--was "
    + alias4(((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"description","hash":{},"data":data}) : helper)))
    + " by-->\n                      <a href=\"/users/entry\">\n              admin@admin.com\n            </a>\n                    </p>\n                    <span class=\"label label-primary label-time\">\n            5 days ago\n          </span>\n                  </li>\n                </ul>\n                <div class=\"ps-scrollbar-x-rail\" style=\"left: 0px; bottom: 3px;\">\n                  <div class=\"ps-scrollbar-x\" style=\"left: 0px; width: 0px;\"></div>\n                </div>\n                <div class=\"ps-scrollbar-y-rail\" style=\"top: 0px; right: 3px;\">\n                  <div class=\"ps-scrollbar-y\" style=\"top: 0px; height: 0px;\"></div>\n                </div>\n              </div>\n              <!--</div>-->\n            </div>\n            <div class=\"ibox-footer\">\n              <span class=\"pull-right\">\n            <a class=\"text-primary\" id=\"view-more\">\n              View more... (5 / 174)\n            </a>\n          </span>\n              <a class=\"text-primary\" id=\"view-less\">\n            View less\n          </a>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"
    + ((stack1 = container.invokePartial(partials.footer,depth0,{"name":"footer","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"usePartial":true,"useData":true});;