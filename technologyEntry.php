<!-- HEADER HTML -->
<?php include "header.php" ?>
<!-- SIDE BAR MENU NAVIGATION -->
<?php include "navbar.php" ?>
<!-- Page wrapper -->
<!-- Page wrapper -->
<div class="row border-bottom white-bg page-heading">
    <div class="col-lg-12">
        <ol class="breadcrumb">
            <li>
                Views
            </li>
            <li class="active">
                <strong>technologyEntry</strong>
            </li>
        </ol>
    </div>
</div>
<div class="wrapper-content">
    <div class="row tooltip-demo">
        <div class="col-lg-3">
            <div style="position: fixed; width: 22.5%;">
                <?php include "elements/technologyCard_add.php" ?>
                <div class="ibox float-e-margins org-about-box">
                    <div class="ibox-content">
                        <table class="table">
                            <tr>
                                <td>Tags</td>
                                <td><span class="tag label label-primary">Drone</span>
                                    <span class="tag label label-primary">UAV</span>
                                    <span class="tag label label-primary">Air</span>
                                    <span class="tag label label-primary">Automation</span>
                                    <span class="tag label label-primary">Artificial Intelligence</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Status</td>
                                <td><span class="label label-primary">Published</span></td>
                            </tr>
                        </table>
                        <button class="btn btn-primary btn-block btn-outline btn-sm">Edit</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-lg-9">
            <div class="row">
                <div class="col-sm-6">
                    <div class="ibox">
                        <div class="ibox-title">
                            <h1>Description</h1>
                        </div>
                        <div class="ibox-content">
                            <p>Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage.</p>
                            <p>This description can be a lot longer and rich in text</p>
                            <ul>
                                <li>We can have bullet lists</li>
                                <li>Other things</li>
                            </ul>
                            <p>and nice formating</p>
                        </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="ibox">
                        <div class="ibox-title">
                            <h1>Images</h1>
                        </div>
                        <div class="ibox-content">
                            <div style="display:inline-block;">
                                <div class="col-sm-3"><img src="http://emsowue.cloudimg.io/s/crop/500x300/http://si.wsj.net/public/resources/images/BN-AS240_gerdro_G_20131209114324.jpg" class="img-responsive" /></div>
                                <div class="col-sm-3"><img src="http://emsowue.cloudimg.io/s/crop/500x300/http://si.wsj.net/public/resources/images/BN-AS240_gerdro_G_20131209114324.jpg" class="img-responsive" /></div>
                                <div class="col-sm-3"><img src="http://emsowue.cloudimg.io/s/crop/500x300/http://si.wsj.net/public/resources/images/BN-AS240_gerdro_G_20131209114324.jpg" class="img-responsive" /></div>
                                <div class="col-sm-3"><img src="http://emsowue.cloudimg.io/s/crop/500x300/http://si.wsj.net/public/resources/images/BN-AS240_gerdro_G_20131209114324.jpg" class="img-responsive" /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h1>
                            <i class="fa fa-paperclip"></i>
                            Organizations
                            </h1>
                    <div class="ibox-tools">
                        <a href="#" id="manage-org-attachments">
                            <i class="fa fa-plus"></i>
                        </a>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row cards-box cards-responsive">
                        <div class="cards-size"></div>
                        <?php include "elements/organizationCard.php" ?>
                        <?php include "elements/organizationCard.php" ?>
                        <?php include "elements/organizationCard.php" ?>
                    </div>
                </div>
            </div>
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h1>
                            <i class="fa fa-folder"></i>
                            Projects
                            </h1>
                    <div class="ibox-tools">
                        <a href="#" id="manage-org-projects">
                            <i class="fa fa-plus"></i>
                        </a>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row cards-box cards-responsive">
                        <div class="cards-size"></div>
                        <?php include "elements/projectCard.php" ?>
                        <?php include "elements/projectCard.php" ?>
                        <?php include "elements/projectCard.php" ?>
                    </div>
                </div>
            </div>
            <div class="ibox float-e-margins">
                <div class="ibox-title">
                    <h1>
                            <i class="fa fa-paperclip"></i>
                            Attachments
                            </h1>
                    <div class="ibox-tools">
                        <a href="#" id="manage-org-attachments">
                            <i class="fa fa-plus"></i>
                        </a>
                    </div>
                </div>
                <div class="ibox-content">
                    <div class="row cards-box cards-responsive">
                        <div class="cards-size"></div>
                        <?php include "elements/attachmentCard.php" ?>
                        <?php include "elements/attachmentCard.php" ?>
                        <?php include "elements/attachmentCard.php" ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<?php include "footer.php" ?>
