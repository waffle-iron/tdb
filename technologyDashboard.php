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
          <h5>Technologies Overview</h5>
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
              <div class="cards-size"></div>
              <?php include "elements/technologyCard.php" ?>
              <?php include "elements/technologyCard.php" ?>
              <?php include "elements/technologyCard.php" ?>
              <?php include "elements/technologyCard.php" ?>
              <?php include "elements/technologyCard.php" ?>
              <?php include "elements/technologyCard.php" ?>
              <?php include "elements/technologyCard.php" ?>
              <?php include "elements/technologyCard.php" ?>
              <?php include "elements/technologyCard.php" ?>
              <?php include "elements/technologyCard.php" ?>
            </div>
          </div>
        </div>
      </div>
    </div>
    <?php include "footer.php" ?>