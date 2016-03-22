<!-- HEADER HTML -->
<?php include "header.php" ?>
<!-- SIDE BAR MENU NAVIGATION -->
<?php include "navbar.php" ?>
<!-- Page wrapper -->
<div class="row border-bottom white-bg page-heading">
  <div class="col-lg-12">
    <ol class="breadcrumb">
      <li>
        Technologies
      </li>
      <li class="active">
        <strong>Dashboard</strong>
      </li>
    </ol>
  </div>
</div>
<div class="wrapper-content">
  <div class="row tooltip-demo">
    <!-- About box -->
    <div class="col-lg-3">
      <div class="ibox">
        <div class="ibox-title">
          <h5>Overview</h5>
        </div>
        <div class="ibox-content dashboard-ibox">
          <p><a href="/organizations/add" class="btn btn-block btn-primary">Add a new technology</a></p>
          <table class="table">
            <tbody>
              <tr>
                <td>
                  We have <strong>123</strong> Technologies on TDB
                </td>
              </tr>
              <tr>
                <td>
                  <strong>80</strong> of them are <a href="" class="label label-primary">Published</a>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>20</strong> of them are <a href="" class="label label-warning">Under Review</a>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>05</strong> of them are <a href="" class="label label-danger">Drafts</a>
                </td>
              </tr>
              <tr>
                <td>
                  The newest one is <a href="" class="label label-danger">3D touch sensitive screens</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- fim do about box -->
    <!-- Início tech stash -->
    <div class="col-lg-9">
      <div class="ibox">
        <div class="ibox-title">
          <h5>Latest updates</h5>
        </div>
        <div class="ibox-content">
          <ul class="list-group">
            <li class="list-group-item">
              <span class="badge badge-primary">5 min ago</span>
              <a class="label label-primary" href="#">Drone Delivery</a> description was updated by <a href="#">Arthur Soares</a>
            </li>
            <li class="list-group-item">
              <span class="badge badge-primary">6 min ago</span>
              <a class="label label-warning" href="#">Skin Patch</a> has 2 new images uploaded by <a href="#">Arthur Soares</a>
            </li>
            <li class="list-group-item">
              <span class="badge badge-primary">8 min ago</span>
              <a class="label label-warning" href="#">Skin Patch</a> has 2 new images uploaded by <a href="#">Arthur Soares</a>
            </li>
            <li class="list-group-item">
              <span class="badge badge-primary">9 min ago</span>
              <a class="label label-danger" href="#">3D touch sensitive screens</a> was created by <a href="#">Arthur Soares</a>
            </li>
            <li class="list-group-item">
              <span class="badge badge-primary">9 min ago</span>
              <a class="label label-danger" href="#">3D touch sensitive screens</a> was created by <a href="#">Arthur Soares</a>
            </li>
            <li class="list-group-item">
              <span class="badge badge-primary">9 min ago</span>
              <a class="label label-danger" href="#">3D touch sensitive screens</a> was created by <a href="#">Arthur Soares</a>
            </li>
          </div>
        </div>
      </div>
    </div>
    <!-- fim -->
    <div class="row tooltip-demo">
      <!-- About box -->
      <div class="col-lg-12">
        <div class="ibox">
          <div class="ibox-title">
            <div class="search-source-display-mode">
              <div class="search-source">
                <div class="input-group">
                  <span class="input-group-addon">
                    <i class="fa fa-search refresh"></i>
                  </span>
                  <input class="form-control" placeholder="Search for something..." name="search" type="text" id="search-text">
                </div>
              </div>
              <div class="display-mode">
                <button class="btn btn-default" type="button" id="toggle-list">
                <i class="fa fa-list"></i>
                </button>
                <button class="btn btn-primary" type="button" id="toggle-grid">
                <i class="fa fa-th"></i>
                </button>
              </div>
            </div>
          </div>
          <div class="ibox-content">

            <div class="row cards-box">
              <!-- Começo tecnologia -->
                      <div class="cards-item">
                          <div class="ibox technology-box">
                              <div class="ibox-content no-padding techLabel panel-primary">
                                  <div class="technologyTools">
                                      <div class="btn-group">
                                          <button class="btn btn-xs btn-outline btn-primary"><i class="fa fa-database"></i></button>
                                          <button data-toggle="dropdown" class="btn btn-xs btn-outline btn-primary dropdown-toggle" aria-expanded="false"><i class="fa fa-bars"></i> <span class="caret"></span></button>
                                          <ul class="dropdown-menu">
                                              <li>
                                                  <a href="#">Add to Project</a>
                                              </li>
                                              <li>
                                                  <a href="#">Add to Collection</a>
                                              </li>
                                              <li>
                                                  <a href="#">Add an Attachment</a>
                                              </li>
                                              <li>
                                                  <a href="#">Change status</a>
                                              </li>
                                              <li class="divider"></li>
                                              <li>
                                                  <a href="#">Add a comment</a>
                                              </li>
                                              <li>
                                                  <a href="#">Edit status</a>
                                              </li>
                                              <li class="divider"></li>
                                              <li>
                                                  <a href="#">Edit technology</a>
                                              </li>
                                              <li>
                                                  <a href="#">Delete technology</a>
                                              </li>
                                          </ul>
                                      </div>
                                  </div>
                                  <img src="http://emsowue.cloudimg.io/s/crop/500x300/http://si.wsj.net/public/resources/images/BN-AS240_gerdro_G_20131209114324.jpg" class="img-responsive" />
                                  <div class="technology-desc">
                                      <div>
                                          <h5 href="#" class="technology-name">Drone Delivery</h5>
                                          <div class="btn-group btn-xs">
                                              <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Readiness: 4"><i class="fa fa-bullseye"></i> 4</button>
                                              <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Average Industry Impact: 4"><i class="fa fa-rocket"></i> 4</button>
                                          </div>
                                      </div>
                                      <p>Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage. Close monitoring of crops could improve water use and pest management.</p>
                                      <div class="btn-group">
                                          <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="View Entry"><i class="fa fa-eye"></i></button>
                                          <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Status is Published">Published</button>
                                          <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="11 attachments"><i class="fa fa-paperclip"></i> 11</button>
                                          <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="02 projects"><i class="fa fa-folder-o"></i> 2</button>
                                          <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="04 organizations"><i class="fa fa-building"></i> 4</button>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                      <!-- Fim tecnologia --><!-- Começo tecnologia -->
        <div class="cards-item">
            <div class="ibox technology-box">
                <div class="ibox-content no-padding techLabel panel-primary">
                    <div class="technologyTools">
                        <div class="btn-group">
                            <button class="btn btn-xs btn-outline btn-primary"><i class="fa fa-database"></i></button>
                            <button data-toggle="dropdown" class="btn btn-xs btn-outline btn-primary dropdown-toggle" aria-expanded="false"><i class="fa fa-bars"></i> <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="#">Add to Project</a>
                                </li>
                                <li>
                                    <a href="#">Add to Collection</a>
                                </li>
                                <li>
                                    <a href="#">Add an Attachment</a>
                                </li>
                                <li>
                                    <a href="#">Change status</a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="#">Add a comment</a>
                                </li>
                                <li>
                                    <a href="#">Edit status</a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="#">Edit technology</a>
                                </li>
                                <li>
                                    <a href="#">Delete technology</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <img src="http://emsowue.cloudimg.io/s/crop/500x300/http://si.wsj.net/public/resources/images/BN-AS240_gerdro_G_20131209114324.jpg" class="img-responsive" />
                    <div class="technology-desc">
                        <div>
                            <h5 href="#" class="technology-name">Drone Delivery</h5>
                            <div class="btn-group btn-xs">
                                <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Readiness: 4"><i class="fa fa-bullseye"></i> 4</button>
                                <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Average Industry Impact: 4"><i class="fa fa-rocket"></i> 4</button>
                            </div>
                        </div>
                        <p>Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage. Close monitoring of crops could improve water use and pest management.</p>
                        <div class="btn-group">
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="View Entry"><i class="fa fa-eye"></i></button>
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Status is Published">Published</button>
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="11 attachments"><i class="fa fa-paperclip"></i> 11</button>
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="02 projects"><i class="fa fa-folder-o"></i> 2</button>
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="04 organizations"><i class="fa fa-building"></i> 4</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fim tecnologia --><!-- Começo tecnologia -->
        <div class="cards-item">
            <div class="ibox technology-box">
                <div class="ibox-content no-padding techLabel panel-primary">
                    <div class="technologyTools">
                        <div class="btn-group">
                            <button class="btn btn-xs btn-outline btn-primary"><i class="fa fa-database"></i></button>
                            <button data-toggle="dropdown" class="btn btn-xs btn-outline btn-primary dropdown-toggle" aria-expanded="false"><i class="fa fa-bars"></i> <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="#">Add to Project</a>
                                </li>
                                <li>
                                    <a href="#">Add to Collection</a>
                                </li>
                                <li>
                                    <a href="#">Add an Attachment</a>
                                </li>
                                <li>
                                    <a href="#">Change status</a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="#">Add a comment</a>
                                </li>
                                <li>
                                    <a href="#">Edit status</a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="#">Edit technology</a>
                                </li>
                                <li>
                                    <a href="#">Delete technology</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <img src="http://emsowue.cloudimg.io/s/crop/500x300/http://si.wsj.net/public/resources/images/BN-AS240_gerdro_G_20131209114324.jpg" class="img-responsive" />
                    <div class="technology-desc">
                        <div>
                            <h5 href="#" class="technology-name">Drone Delivery</h5>
                            <div class="btn-group btn-xs">
                                <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Readiness: 4"><i class="fa fa-bullseye"></i> 4</button>
                                <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Average Industry Impact: 4"><i class="fa fa-rocket"></i> 4</button>
                            </div>
                        </div>
                        <p>Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage. Close monitoring of crops could improve water use and pest management.</p>
                        <div class="btn-group">
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="View Entry"><i class="fa fa-eye"></i></button>
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Status is Published">Published</button>
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="11 attachments"><i class="fa fa-paperclip"></i> 11</button>
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="02 projects"><i class="fa fa-folder-o"></i> 2</button>
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="04 organizations"><i class="fa fa-building"></i> 4</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fim tecnologia --><!-- Começo tecnologia -->
        <div class="cards-item">
            <div class="ibox technology-box">
                <div class="ibox-content no-padding techLabel panel-primary">
                    <div class="technologyTools">
                        <div class="btn-group">
                            <button class="btn btn-xs btn-outline btn-primary"><i class="fa fa-database"></i></button>
                            <button data-toggle="dropdown" class="btn btn-xs btn-outline btn-primary dropdown-toggle" aria-expanded="false"><i class="fa fa-bars"></i> <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="#">Add to Project</a>
                                </li>
                                <li>
                                    <a href="#">Add to Collection</a>
                                </li>
                                <li>
                                    <a href="#">Add an Attachment</a>
                                </li>
                                <li>
                                    <a href="#">Change status</a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="#">Add a comment</a>
                                </li>
                                <li>
                                    <a href="#">Edit status</a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="#">Edit technology</a>
                                </li>
                                <li>
                                    <a href="#">Delete technology</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <img src="http://emsowue.cloudimg.io/s/crop/500x300/http://si.wsj.net/public/resources/images/BN-AS240_gerdro_G_20131209114324.jpg" class="img-responsive" />
                    <div class="technology-desc">
                        <div>
                            <h5 href="#" class="technology-name">Drone Delivery</h5>
                            <div class="btn-group btn-xs">
                                <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Readiness: 4"><i class="fa fa-bullseye"></i> 4</button>
                                <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Average Industry Impact: 4"><i class="fa fa-rocket"></i> 4</button>
                            </div>
                        </div>
                        <p>Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage. Close monitoring of crops could improve water use and pest management.</p>
                        <div class="btn-group">
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="View Entry"><i class="fa fa-eye"></i></button>
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Status is Published">Published</button>
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="11 attachments"><i class="fa fa-paperclip"></i> 11</button>
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="02 projects"><i class="fa fa-folder-o"></i> 2</button>
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="04 organizations"><i class="fa fa-building"></i> 4</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fim tecnologia --><!-- Começo tecnologia -->
        <div class="cards-item">
            <div class="ibox technology-box">
                <div class="ibox-content no-padding techLabel panel-primary">
                    <div class="technologyTools">
                        <div class="btn-group">
                            <button class="btn btn-xs btn-outline btn-primary"><i class="fa fa-database"></i></button>
                            <button data-toggle="dropdown" class="btn btn-xs btn-outline btn-primary dropdown-toggle" aria-expanded="false"><i class="fa fa-bars"></i> <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li>
                                    <a href="#">Add to Project</a>
                                </li>
                                <li>
                                    <a href="#">Add to Collection</a>
                                </li>
                                <li>
                                    <a href="#">Add an Attachment</a>
                                </li>
                                <li>
                                    <a href="#">Change status</a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="#">Add a comment</a>
                                </li>
                                <li>
                                    <a href="#">Edit status</a>
                                </li>
                                <li class="divider"></li>
                                <li>
                                    <a href="#">Edit technology</a>
                                </li>
                                <li>
                                    <a href="#">Delete technology</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <img src="http://emsowue.cloudimg.io/s/crop/500x300/http://si.wsj.net/public/resources/images/BN-AS240_gerdro_G_20131209114324.jpg" class="img-responsive" />
                    <div class="technology-desc">
                        <div>
                            <h5 href="#" class="technology-name">Drone Delivery</h5>
                            <div class="btn-group btn-xs">
                                <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Readiness: 4"><i class="fa fa-bullseye"></i> 4</button>
                                <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Average Industry Impact: 4"><i class="fa fa-rocket"></i> 4</button>
                            </div>
                        </div>
                        <p>Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage. Close monitoring of crops could improve water use and pest management.</p>
                        <div class="btn-group">
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="View Entry"><i class="fa fa-eye"></i></button>
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Status is Published">Published</button>
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="11 attachments"><i class="fa fa-paperclip"></i> 11</button>
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="02 projects"><i class="fa fa-folder-o"></i> 2</button>
                            <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="04 organizations"><i class="fa fa-building"></i> 4</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Fim tecnologia -->
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <?php include "footer.php" ?>