this["TDB"] = this["TDB"] || {};
this["TDB"]["templates"] = this["TDB"]["templates"] || {};
this["TDB"]["templates"]["projectEntry"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.projectCard_add,depth0,{"name":"projectCard_add","data":data,"indent":"        ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.navbar,depth0,{"name":"navbar","data":data,"helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "")
    + "<div class=\"row border-bottom white-bg page-heading\">\n  <div class=\"col-lg-12\">\n    <ol class=\"breadcrumb\">\n      <li>\n        <a href=\"#/projects\">Projects</a>\n      </li>\n      <li class=\"active\">\n        <strong>Futuro da Medicina</strong>\n      </li>\n    </ol>\n  </div>\n</div>\n<div class=\"wrapper-content\">\n  <div class=\"row tooltip-demo\">\n    <!-- About box -->\n    <div class=\"col-lg-3\">\n"
    + ((stack1 = helpers.each.call(depth0 != null ? depth0 : {},(depth0 != null ? depth0.projects : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "      <table class=\"table small\">\n        <tbody>\n          <tr>\n            <td>\n              <strong>Status</strong>\n            </td>\n            <td>\n              <span class=\"label label-primary\">Open</span>\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <strong>23</strong> Technologies\n            </td>\n            <td>\n              <strong>05</strong> Under Review\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <strong>03</strong> Collections Sets\n            </td>\n            <td>\n              <strong>12</strong> Collections\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <strong>Created</strong>\n            </td>\n            <td>\n              Dec 13, 2013\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <strong>Last updated</strong>\n            </td>\n            <td>\n              Dec 13, 2015\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <strong>Organizations</strong>\n            </td>\n            <td>\n              <a href=\"#/organizations/entry\" class=\"btn btn-xs btn-outline btn-primary\">One Health</a>\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <strong>Participants</strong>\n            </td>\n            <td class=\"project-people\">\n              <a href=\"\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Arthur Soares\"><img alt=\"image\" class=\"img-circle\" src=\"../images/a3.jpg\"></a>\n              <a href=\"\" data-toggle=\"tooltip\" data-placement=\"top\" title=\"\" data-original-title=\"Michell Zappa\"><img alt=\"image\" class=\"img-circle\" src=\"../images/a1.jpg\"></a>\n            </td>\n          </tr>\n          <tr>\n            <td>\n              <strong>URL</strong>\n            </td>\n            <td>\n              <a href=\"#\">http://futurodamedicina.com.br</a>\n            </td>\n          </tr>\n        </tbody>\n      </table>\n      <a href=\"#/projects/edit\" class=\"btn btn-primary btn-block btn-outline btn-sm\">Edit</a>\n    </div>\n    <!-- fim do about box -->\n    <!-- Início tech stash -->\n    <div class=\"col-lg-9\">\n      <div class=\"ibox\">\n        <div class=\"ibox-title\">\n          <h5>Technology Stash</h5>\n          <div class=\"ibox-tools\">\n            <a href=\"#\">\n                                Browse\n                            </a>\n          </div>\n        </div>\n        <div class=\"ibox-content\">\n          <div class=\"row\">\n            <div class=\"col-sm-12\">\n              <input type=\"text\" placeholder=\"Search\" class=\"input-sm form-control\">\n            </div>\n          </div>\n          <table class=\"footable table table-stripped toggle-arrow-tiny\" data-page-size=\"8\">\n            <thead>\n              <tr>\n                <th data-toggle=\"true\">Name</th>\n                <th>Status</th>\n                <th>Added by</th>\n                <th>Date</th>\n                <th>Collections</th>\n                <th>Action</th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr>\n                <td><a herf=\"#\">Drone Delivery</a></td>\n                <td><span class=\"label label-primary\">Published</span></td>\n                <td><a href=\"#\">Arthur S</a></td>\n                <td>Dec 15, 2015</td>\n                <td><a href=\"#\" class=\"btn btn-xs btn-outline btn-primary\">Energy</a> <a href=\"#\" class=\"btn btn-xs btn-outline btn-primary\">Production</a></td>\n                <td>\n                  <a href=\"#\"><i class=\"fa fa-arrows-alt fa-fw\"></i></a>\n                  <a href=\"#\"><i class=\"fa fa-search fa-fw\"></i></a>\n                  <a href=\"#\"><i class=\"fa fa-times fa-fw\"></i></a>\n                </td>\n              </tr>\n              <tr>\n                <td><a herf=\"#\">Drone Delivery</a></td>\n                <td><span class=\"label label-danger\">Draft</span></td>\n                <td><a href=\"#\">Michell Z</a></td>\n                <td>Dec 17, 2015</td>\n                <td></td>\n                <td>\n                  <a href=\"#\"><i class=\"fa fa-arrows-alt fa-fw\"></i></a>\n                  <a href=\"#\"><i class=\"fa fa-search fa-fw\"></i></a>\n                  <a href=\"#\"><i class=\"fa fa-times fa-fw\"></i></a>\n                </td>\n              </tr>\n              <tr>\n                <td><a herf=\"#\">Drone Delivery</a></td>\n                <td><span class=\"label label-warning\">Review</span></td>\n                <td><a href=\"#\">Arthur S</a></td>\n                <td>Dec 15, 2015</td>\n                <td><a href=\"#\" class=\"btn btn-xs btn-outline btn-primary\">Production</a></td>\n                <td>\n                  <a href=\"#\"><i class=\"fa fa-arrows-alt fa-fw\"></i></a>\n                  <a href=\"#\"><i class=\"fa fa-search fa-fw\"></i></a>\n                  <a href=\"#\"><i class=\"fa fa-times fa-fw\"></i></a>\n                </td>\n              </tr>\n              <tr>\n                <td><a herf=\"#\">Drone Delivery</a></td>\n                <td><span class=\"label label-primary\">Published</span></td>\n                <td><a href=\"#\">Arthur S</a></td>\n                <td>Dec 15, 2015</td>\n                <td><a href=\"#\" class=\"btn btn-xs btn-outline btn-primary\">Energy</a> <a href=\"#\" class=\"btn btn-xs btn-outline btn-primary\">Production</a></td>\n                <td>\n                  <a href=\"#\"><i class=\"fa fa-arrows-alt fa-fw\"></i></a>\n                  <a href=\"#\"><i class=\"fa fa-search fa-fw\"></i></a>\n                  <a href=\"#\"><i class=\"fa fa-times fa-fw\"></i></a>\n                </td>\n              </tr>\n            </tbody>\n            <tfoot>\n              <tr>\n                <td colspan=\"6\">\n                  <ul class=\"pagination pull-right\"></ul>\n                </td>\n              </tr>\n            </tfoot>\n          </table>\n        </div>\n      </div>\n    </div>\n    <!-- fim -->\n    <div class=\"col-sm-9\">\n      <div class=\"ibox\">\n        <div class=\"ibox-title\">\n          <h5>Collection Sets</h5>\n          <div class=\"ibox-tools\">\n          </div>\n        </div>\n        <div class=\"ibox-content\">\n          <!-- Inicio CollectionSet -->\n          <div class=\"row\">\n            <div class=\"ibox panel-primary collectionLabel\">\n              <div class=\"ibox-title\">\n                <h5>Taxonomical</h5>\n                <div class=\"ibox-tools\">\n                  <a href=\"#/projects/collection\">Browse</a>\n                </div>\n              </div>\n              <div class=\"ibox-content\">\n                <div id=\"collectionSetBox\" class=\"row\">\n                  <!-- início coleções -->\n                  <div class=\"collectionSubColumn\">\n                    <div class=\"ibox\">\n                      <div class=\"ibox-title\">\n                        <h5>Energy</h5>\n                        <div class=\"ibox-tools\">\n                          <a href=\"#\"><i class=\"fa fa-arrows-alt\"></i></a>\n                        </div>\n                      </div>\n                      <div class=\"ibox-content\">\n                        <ul class=\"sortable-list connectList agile-list\">\n                          <li>\n                            Efficiency\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">02</a>\n                          </li>\n                          <li>\n                            Management\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Propulsion\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                        </ul>\n                      </div>\n                    </div>\n                  </div>\n                  <!-- fim coleção -->\n                  <!-- início coleções -->\n                  <div class=\"collectionSubColumn\">\n                    <div class=\"ibox\">\n                      <div class=\"ibox-title\">\n                        <h5>IT</h5>\n                        <div class=\"ibox-tools\">\n                          <a href=\"#\"><i class=\"fa fa-arrows-alt\"></i></a>\n                        </div>\n                      </div>\n                      <div class=\"ibox-content\">\n                        <ul class=\"sortable-list connectList agile-list\">\n                          <li>\n                            Communications\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Computation\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            IOT\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                        </ul>\n                      </div>\n                    </div>\n                  </div>\n                  <!-- fim coleção -->\n                  <!-- início coleções -->\n                  <div class=\"collectionSubColumn\">\n                    <div class=\"ibox\">\n                      <div class=\"ibox-title\">\n                        <h5>Life Sciences</h5>\n                        <div class=\"ibox-tools\">\n                          <a href=\"#\"><i class=\"fa fa-arrows-alt\"></i></a>\n                        </div>\n                      </div>\n                      <div class=\"ibox-content\">\n                        <ul class=\"sortable-list connectList agile-list\">\n                          <li>\n                            Biomechanical Engineering\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Cognitive & Umwelt Sensing\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Biotechnology\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Medical Health\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                        </ul>\n                      </div>\n                    </div>\n                  </div>\n                  <!-- fim coleção -->\n                  <!-- início coleções -->\n                  <div class=\"collectionSubColumn\">\n                    <div class=\"ibox\">\n                      <div class=\"ibox-title\">\n                        <h5>Nanotechnology & Materials</h5>\n                        <div class=\"ibox-tools\">\n                          <a href=\"#\"><i class=\"fa fa-arrows-alt\"></i></a>\n                        </div>\n                      </div>\n                      <div class=\"ibox-content\">\n                        <ul class=\"sortable-list connectList agile-list\">\n                          <li>\n                            Base Compound\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Biological\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Construct\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Devices\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                        </ul>\n                      </div>\n                    </div>\n                  </div>\n                  <!-- fim coleção -->\n                  <!-- início coleções -->\n                  <div class=\"collectionSubColumn\">\n                    <div class=\"ibox\">\n                      <div class=\"ibox-title\">\n                        <h5>Systems</h5>\n                        <div class=\"ibox-tools\">\n                          <a href=\"#\"><i class=\"fa fa-arrows-alt\"></i></a>\n                        </div>\n                      </div>\n                      <div class=\"ibox-content\">\n                        <ul class=\"sortable-list connectList agile-list\">\n                          <li>\n                            Base Compound\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Biological\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Construct\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Devices\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                        </ul>\n                      </div>\n                    </div>\n                  </div>\n                  <!-- fim coleção -->\n                </div>\n              </div>\n            </div>\n            <!-- Fim de collectionSet -->\n          </div>\n          <!-- Inicio CollectionSet -->\n          <div class=\"row\">\n            <div class=\"ibox panel-primary collectionLabel\">\n              <div class=\"ibox-title\">\n                <h5>Scenarios</h5>\n                <div class=\"ibox-tools\">\n                  <a href=\"#\">\n                                        Browse\n                                    </a>\n                </div>\n              </div>\n              <div class=\"ibox-content\">\n                <div id=\"collectionSetBox\" class=\"row\">\n                  <!-- início coleções -->\n                  <div class=\"collectionSubColumn\">\n                    <div class=\"ibox\">\n                      <div class=\"ibox-title\">\n                        <h5>Energy</h5>\n                        <div class=\"ibox-tools\">\n                          <a href=\"#\"><i class=\"fa fa-arrows-alt\"></i></a>\n                        </div>\n                      </div>\n                      <div class=\"ibox-content\">\n                        <ul class=\"sortable-list connectList agile-list\">\n                          <li>\n                            Efficiency\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">02</a>\n                          </li>\n                          <li>\n                            Management\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Propulsion\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                        </ul>\n                      </div>\n                    </div>\n                  </div>\n                  <!-- fim coleção -->\n                  <!-- início coleções -->\n                  <div class=\"collectionSubColumn\">\n                    <div class=\"ibox\">\n                      <div class=\"ibox-title\">\n                        <h5>IT</h5>\n                        <div class=\"ibox-tools\">\n                          <a href=\"#\"><i class=\"fa fa-arrows-alt\"></i></a>\n                        </div>\n                      </div>\n                      <div class=\"ibox-content\">\n                        <ul class=\"sortable-list connectList agile-list\">\n                          <li>\n                            Communications\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Computation\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            IOT\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                        </ul>\n                      </div>\n                    </div>\n                  </div>\n                  <!-- fim coleção -->\n                  <!-- início coleções -->\n                  <div class=\"collectionSubColumn\">\n                    <div class=\"ibox\">\n                      <div class=\"ibox-title\">\n                        <h5>Life Sciences</h5>\n                        <div class=\"ibox-tools\">\n                          <a href=\"#\"><i class=\"fa fa-arrows-alt\"></i></a>\n                        </div>\n                      </div>\n                      <div class=\"ibox-content\">\n                        <ul class=\"sortable-list connectList agile-list\">\n                          <li>\n                            Biomechanical Engineering\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Cognitive & Umwelt Sensing\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Biotechnology\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Medical Health\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                        </ul>\n                      </div>\n                    </div>\n                  </div>\n                  <!-- fim coleção -->\n                  <!-- início coleções -->\n                  <div class=\"collectionSubColumn\">\n                    <div class=\"ibox\">\n                      <div class=\"ibox-title\">\n                        <h5>Nanotechnology & Materials</h5>\n                        <div class=\"ibox-tools\">\n                          <a href=\"#\"><i class=\"fa fa-arrows-alt\"></i></a>\n                        </div>\n                      </div>\n                      <div class=\"ibox-content\">\n                        <ul class=\"sortable-list connectList agile-list\">\n                          <li>\n                            Base Compound\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Biological\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Construct\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Devices\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                        </ul>\n                      </div>\n                    </div>\n                  </div>\n                  <!-- fim coleção -->\n                  <!-- início coleções -->\n                  <div class=\"collectionSubColumn\">\n                    <div class=\"ibox\">\n                      <div class=\"ibox-title\">\n                        <h5>Systems</h5>\n                        <div class=\"ibox-tools\">\n                          <a href=\"#\"><i class=\"fa fa-arrows-alt\"></i></a>\n                        </div>\n                      </div>\n                      <div class=\"ibox-content\">\n                        <ul class=\"sortable-list connectList agile-list\">\n                          <li>\n                            Base Compound\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Biological\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Construct\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                          <li>\n                            Devices\n                            <a href=\"#\" class=\"pull-btn pull-right btn-xs btn-white\">04</a>\n                          </li>\n                        </ul>\n                      </div>\n                    </div>\n                  </div>\n                  <!-- fim coleção -->\n                </div>\n              </div>\n            </div>\n          </div>\n          <!-- Fim de collectionSet -->\n        </div>\n      </div>\n    </div>\n  </div>\n";
},"usePartial":true,"useData":true});;