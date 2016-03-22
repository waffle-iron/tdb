<!-- HEADER HTML -->
<?php include "header.php" ?>
<!-- SIDE BAR MENU NAVIGATION -->
<?php include "navbar.php" ?>
<!-- Page wrapper -->
<div class="row border-bottom white-bg page-heading">
  <div class="col-lg-12">
    <ol class="breadcrumb">
      <li>
        Organizations
      </li>
      <li class="active">
        <strong>Tesla Motors</strong>
      </li>
    </ol>
  </div>
</div>
<div class="wrapper-content">
  <!-- START HERE -->
  <div class="row tooltip-demo">
    <div class="col-md-3">
      <div class="ibox float-e-margins org-about-box">
        <div class="ibox-title">
          <h3>
          <i class="fa fa-building"></i> Tesla Motors
          </h3>
          <div class="ibox-tools">
            <a href="#" id="org-edit">
              <i class="fa fa-pencil"></i>
            </a>
          </div>
        </div>
        <div class="ibox-content">
          <img src="http://res.cloudinary.com/envisioning/image/upload/c_fill,h_500,w_500/v1/s3-staging/images/NjQDcFPAz3Ly4XmnX" class="safe-img img-responsive change-logo-image" onerror="this.style.display='none';">
        </div>
        <div class="ibox-content">
          <table class="table">
            <tr>
              <td>Founding Year</td>
              <td>2003</td>
            </tr>
            <tr>
              <td>Country</td>
              <td><span class="flag-icon flag-icon-us"></span> United States</td>
            </tr>
            <tr>
              <td>Type</td>
              <td><span class="badge badge-warning">Private</span></td>
            </tr>
            <tr>
              <td>People</td>
              <td>
                <a href="#" class="btn add-people" id="add-people">
                  <i class="fa fa-plus"></i>
                </a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <!-- Second box -->
    <div class="col-md-9">
      <div class="row">
        <div class="col-xs-12">
          <div class="ibox float-e-margins">
            <div class="ibox-title">
              <h1>
              <i class="fa fa-database"></i>
              Technologies
              </h1>
              <div class="ibox-tools">
                <a href="#" id="manage-org-projects">
                  <i class="fa fa-plus"></i>
                </a>
              </div>
            </div>
            <!-- Content -->
            <div class="ibox-content">
              <div class="row cards-box">
                <div class="cards-size"></div>
                <?php include "elements/technologyCard.php" ?>
                <?php include "elements/technologyCard.php" ?>
                <?php include "elements/technologyCard.php" ?>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- INICIO Projects -->
      <div class="row">
        <div class="col-xs-12">
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
              <div class="row cards-box">
                <div class="cards-size"></div>
                <?php include "elements/projectCard.php" ?>
                <?php include "elements/projectCard.php" ?>
                <?php include "elements/projectCard.php" ?>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12">
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
              <div class="row cards-box">
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
  </div>
  <!-- FOOTER HTML -->
  <?php include "footer.php" ?>