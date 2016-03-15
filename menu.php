<?php include "header.php" ?>
<nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">

        <ul class="nav" id="side-menu">
            <li class="nav-header">
                <div class="dropdown profile-element">
                    <span>
                        <img class="img-circle" src="/img/unknown.jpg" width="48" height="48" id="profile-avatar">
                    </span>
                    <a data-toggle="dropdown" class="dropdown-toggle" href="#">
                        <span class="clear">
                            <span class="block m-t-xs">
                                <strong class="font-bold">
                                Ben Stiller
                                </strong>
                            </span>
                            <span class="text-muted text-xs">
                                <b style="color:white !important;">Admin</b>
                                <b class="caret"></b>
                            </span>
                        </span>
                    </a>
                </div>
                <div class="logo-element animated lightSpeedIn">
                    TDB
                </div>
            </li>
            <li>
                <a href="/search"><i class="fa fa-search"></i> <span class="nav-label">Search</span></a>
            </li>
            <li>
                <a href="/dashboard"><i class="fa fa-dashboard"></i> <span class="nav-label">Dashboard</span></a>
            </li>
            <li>
                <a href="#"><i class="fa fa-users"></i> <span class="nav-label">Users</span><span class="fa arrow"></span></a>
                <ul class="nav nav-second-level collapse">
                    <li class="nav-second-level-label">Users</li>
                    <li><a href="/users">Dashboard</a></li>
                    <li><a href="/users/invite">Invite</a></li>
                </ul>
            </li>
            <li>
                <a href="#"><i class="fa fa-database"></i> <span class="nav-label">Technologies</span><span class="fa arrow"></span></a>
                <ul class="nav nav-second-level collapse">
                    <li class="nav-second-level-label">Technologies</li>
                    <li><a href="/technologies">Dashboard</a></li>
                    <li><a href="/technologies/add">New</a></li>
                </ul>
            </li>
            <li>
                <a href="#"><i class="fa fa-folder"></i> <span class="nav-label">Projects</span><span class="fa arrow"></span></a>
                <ul class="nav nav-second-level collapse">
                    <li class="nav-second-level-label">Projects</li>
                    <li><a href="/projects">Dashboard</a></li>
                    <li><a href="/projects/add">New</a></li>
                </ul>
            </li>
            <li>
                <a href="#"><i class="fa fa-building"></i> <span class="nav-label">Organizations</span><span class="fa arrow"></span></a>
                <ul class="nav nav-second-level collapse">
                    <li class="nav-second-level-label">Organizations</li>
                    <li><a href="/organizations">Dashboard</a></li>
                    <li><a href="/organizations/add">New</a></li>
                </ul>
            </li>
            <li>
                <a href="#"><i class="fa fa-paperclip"></i> <span class="nav-label">Attachments</span><span class="fa arrow"></span></a>
                <ul class="nav nav-second-level collapse">
                    <li class="nav-second-level-label">Attachments</li>
                    <li><a href="/attachments">Dashboard</a></li>
                    <li><a href="/attachments/add">New</a></li>
                </ul>
            </li>
        </ul>

</nav>
<div class="wrapper wrapper-content animated fadeInRight">
    <div class="row tooltip-demo">
        <div class="col-md-3">
            <!-- Começo tecnologia -->
            <div class="ibox technology-box">
                <div class="ibox-content no-padding techLabel panel-primary">
                    <div class="technologyTools">
                        <div class="btn-group">
                            <button data-toggle="dropdown" class="btn btn-xs btn-outline btn-primary dropdown-toggle" aria-expanded="false"><i class="fa fa-bars"></i> <span class="caret"></span></button>
                            <ul class="dropdown-menu">
                                <li><a href="#">Add to Project</a>
                            </li>
                            <li><a href="#">Add to Collection</a>
                        </li>
                        <li><a href="#">Add an Attachment</a>
                    </li>
                    <li><a href="#">Change status</a>
                    <li class="divider"></li>
                    <li><a href="#">Add a comment</a>
                </li>
                <li><a href="#">Edit status</a>
            </li>
            <li class="divider"></li>
            <li><a href="#">Edit technology</a>
        </li>
        <li><a href="#">Delete technology</a></li>
    </ul>
</div>
</div>
<img src="http://emsowue.cloudimg.io/s/crop/500x300/http://si.wsj.net/public/resources/images/BN-AS240_gerdro_G_20131209114324.jpg" class="img-responsive" />
<div class="technology-desc">
<div class="addonsInfo">
    <a href="#" class="label label-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="11 attachments"><i class="fa fa-paperclip"></i> 11</a>
    <a href="#" class="label label-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="04 organizations"><i class="fa fa-building"></i> 4</a>
    <a href="#" class="label label-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="02 projects"><i class="fa fa-folder-o"></i> 2</a>
    <a href="#" class="label label-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Readiness: 4"><i class="fa fa-bullseye"></i> 4</a>
    <a href="#" class="label label-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Average Industry Impact: 4"><i class="fa fa-rocket"></i> 4</a>
</div>
<div>
    <h5 href="#" class="technology-name">Drone Delivery</h5>
</div>
<p>Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage. Close monitoring of crops could improve water use and pest management. <small><a href="#">More information </a></small></p>
<div class="m-t-sm">
    <button class="btn btn-white btn-xs">drone</button>
    <button class="btn btn-white btn-xs">uav</button>
    <button class="btn btn-white btn-xs">Rag</button>
    <button class="btn btn-xs btn-link"><i class="fa fa-plus-square"></i> Add</button>
</div>
</div>
</div>
</div>
<!-- Fim tecnologia -->
</div>
</div>
</div>
<!-- FOOTER HTML -->
<?php include "footer.php" ?>