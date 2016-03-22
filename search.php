<!-- HEADER HTML -->
<?php include "header.php" ?>
<!-- SIDE BAR MENU NAVIGATION -->
<?php include "navbar.php" ?>
<!-- Page wrapper -->
<div class="wrapper-content">
  <div class="row">
    <div class="row border-bottom">
        <nav class="navbar navbar-static-top" role="navigation">
            <div class="navbar-header">
                <button aria-controls="navbar" aria-expanded="false" data-target="#navbar" data-toggle="collapse" class="navbar-toggle collapsed" type="button">
                <i class="fa fa-reorder"></i>
                </button>
                <a href="index.php" class="navbar-brand">TDB</a>
            </div>
            <div class="navbar-collapse collapse" id="navbar">
                <ul class="nav navbar-nav">
                    <li>
                        <form role="search" class="navbar-form-custom" action="search_results.html">
                            <div class="form-group">
                                <input type="text" placeholder="Search for something..." class="form-control" name="top-search" id="top-search">
                                <div class="daterangepicker dropdown-menu show-calendar opensright" style="top: 2318px; left: 265px; right: auto; display: block;">
                                   <div class="calendar first right">
                                      <div class="calendar-date">
                                         <table class="table-condensed">
                                            <thead>
                                               <tr>
                                                  <th></th>
                                                  <th colspan="5" class="month">Jan 2015</th>
                                                  <th class="next available"><i class="fa fa-arrow-right icon icon-arrow-right glyphicon glyphicon-arrow-right"></i></th>
                                               </tr>
                                               <tr>
                                                  <th>Su</th>
                                                  <th>Mo</th>
                                                  <th>Tu</th>
                                                  <th>We</th>
                                                  <th>Th</th>
                                                  <th>Fr</th>
                                                  <th>Sa</th>
                                               </tr>
                                            </thead>
                                            <tbody>
                                               <tr>
                                                  <td class="off disabled" data-title="r0c0">28</td>
                                                  <td class="off disabled" data-title="r0c1">29</td>
                                                  <td class="off disabled" data-title="r0c2">30</td>
                                                  <td class="off disabled" data-title="r0c3">31</td>
                                                  <td class="available in-range" data-title="r0c4">1</td>
                                                  <td class="available in-range" data-title="r0c5">2</td>
                                                  <td class="available in-range" data-title="r0c6">3</td>
                                               </tr>
                                               <tr>
                                                  <td class="available in-range" data-title="r1c0">4</td>
                                                  <td class="available in-range" data-title="r1c1">5</td>
                                                  <td class="available in-range" data-title="r1c2">6</td>
                                                  <td class="available in-range" data-title="r1c3">7</td>
                                                  <td class="available in-range" data-title="r1c4">8</td>
                                                  <td class="available in-range" data-title="r1c5">9</td>
                                                  <td class="available in-range" data-title="r1c6">10</td>
                                               </tr>
                                               <tr>
                                                  <td class="available in-range" data-title="r2c0">11</td>
                                                  <td class="available in-range" data-title="r2c1">12</td>
                                                  <td class="available in-range" data-title="r2c2">13</td>
                                                  <td class="available in-range" data-title="r2c3">14</td>
                                                  <td class="available in-range" data-title="r2c4">15</td>
                                                  <td class="available in-range" data-title="r2c5">16</td>
                                                  <td class="available in-range" data-title="r2c6">17</td>
                                               </tr>
                                               <tr>
                                                  <td class="available in-range" data-title="r3c0">18</td>
                                                  <td class="available in-range" data-title="r3c1">19</td>
                                                  <td class="available in-range" data-title="r3c2">20</td>
                                                  <td class="available in-range" data-title="r3c3">21</td>
                                                  <td class="available in-range" data-title="r3c4">22</td>
                                                  <td class="available in-range" data-title="r3c5">23</td>
                                                  <td class="available in-range" data-title="r3c6">24</td>
                                               </tr>
                                               <tr>
                                                  <td class="available in-range" data-title="r4c0">25</td>
                                                  <td class="available in-range" data-title="r4c1">26</td>
                                                  <td class="available in-range" data-title="r4c2">27</td>
                                                  <td class="available in-range" data-title="r4c3">28</td>
                                                  <td class="available in-range" data-title="r4c4">29</td>
                                                  <td class="available in-range" data-title="r4c5">30</td>
                                                  <td class="available active end-date" data-title="r4c6">31</td>
                                               </tr>
                                               <tr>
                                                  <td class="available off" data-title="r5c0">1</td>
                                                  <td class="available off" data-title="r5c1">2</td>
                                                  <td class="available off" data-title="r5c2">3</td>
                                                  <td class="available off" data-title="r5c3">4</td>
                                                  <td class="available off" data-title="r5c4">5</td>
                                                  <td class="available off" data-title="r5c5">6</td>
                                                  <td class="available off" data-title="r5c6">7</td>
                                               </tr>
                                            </tbody>
                                         </table>
                                      </div>
                                   </div>
                                   <div class="calendar second left">
                                      <div class="calendar-date">
                                         <table class="table-condensed">
                                            <thead>
                                               <tr>
                                                  <th class="prev available"><i class="fa fa-arrow-left icon icon-arrow-left glyphicon glyphicon-arrow-left"></i></th>
                                                  <th colspan="5" class="month">Jan 2015</th>
                                                  <th class="next available"><i class="fa fa-arrow-right icon icon-arrow-right glyphicon glyphicon-arrow-right"></i></th>
                                               </tr>
                                               <tr>
                                                  <th>Su</th>
                                                  <th>Mo</th>
                                                  <th>Tu</th>
                                                  <th>We</th>
                                                  <th>Th</th>
                                                  <th>Fr</th>
                                                  <th>Sa</th>
                                               </tr>
                                            </thead>
                                            <tbody>
                                               <tr>
                                                  <td class="available off" data-title="r0c0">28</td>
                                                  <td class="available off" data-title="r0c1">29</td>
                                                  <td class="available off" data-title="r0c2">30</td>
                                                  <td class="available off" data-title="r0c3">31</td>
                                                  <td class="available active start-date" data-title="r0c4">1</td>
                                                  <td class="available in-range" data-title="r0c5">2</td>
                                                  <td class="available in-range" data-title="r0c6">3</td>
                                               </tr>
                                               <tr>
                                                  <td class="available in-range" data-title="r1c0">4</td>
                                                  <td class="available in-range" data-title="r1c1">5</td>
                                                  <td class="available in-range" data-title="r1c2">6</td>
                                                  <td class="available in-range" data-title="r1c3">7</td>
                                                  <td class="available in-range" data-title="r1c4">8</td>
                                                  <td class="available in-range" data-title="r1c5">9</td>
                                                  <td class="available in-range" data-title="r1c6">10</td>
                                               </tr>
                                               <tr>
                                                  <td class="available in-range" data-title="r2c0">11</td>
                                                  <td class="available in-range" data-title="r2c1">12</td>
                                                  <td class="available in-range" data-title="r2c2">13</td>
                                                  <td class="available in-range" data-title="r2c3">14</td>
                                                  <td class="available in-range" data-title="r2c4">15</td>
                                                  <td class="available in-range" data-title="r2c5">16</td>
                                                  <td class="available in-range" data-title="r2c6">17</td>
                                               </tr>
                                               <tr>
                                                  <td class="available in-range" data-title="r3c0">18</td>
                                                  <td class="available in-range" data-title="r3c1">19</td>
                                                  <td class="available in-range" data-title="r3c2">20</td>
                                                  <td class="available in-range" data-title="r3c3">21</td>
                                                  <td class="available in-range" data-title="r3c4">22</td>
                                                  <td class="available in-range" data-title="r3c5">23</td>
                                                  <td class="available in-range" data-title="r3c6">24</td>
                                               </tr>
                                               <tr>
                                                  <td class="available in-range" data-title="r4c0">25</td>
                                                  <td class="available in-range" data-title="r4c1">26</td>
                                                  <td class="available in-range" data-title="r4c2">27</td>
                                                  <td class="available in-range" data-title="r4c3">28</td>
                                                  <td class="available in-range" data-title="r4c4">29</td>
                                                  <td class="available in-range" data-title="r4c5">30</td>
                                                  <td class="available in-range" data-title="r4c6">31</td>
                                               </tr>
                                               <tr>
                                                  <td class="available off" data-title="r5c0">1</td>
                                                  <td class="available off" data-title="r5c1">2</td>
                                                  <td class="available off" data-title="r5c2">3</td>
                                                  <td class="available off" data-title="r5c3">4</td>
                                                  <td class="available off" data-title="r5c4">5</td>
                                                  <td class="available off" data-title="r5c5">6</td>
                                                  <td class="available off" data-title="r5c6">7</td>
                                               </tr>
                                            </tbody>
                                         </table>
                                      </div>
                                   </div>
                                   <div class="ranges">
                                      <div class="range_inputs">
                                         <div class="daterangepicker_start_input"><label for="daterangepicker_start">From</label><input class="input-mini" type="text" name="daterangepicker_start" value=""></div>
                                         <div class="daterangepicker_end_input"><label for="daterangepicker_end">To</label><input class="input-mini" type="text" name="daterangepicker_end" value=""></div>
                                         <button class="applyBtn btn btn-small btn-sm btn-success">Apply</button>&nbsp;<button class="cancelBtn btn btn-small btn-sm btn-default">Cancel</button>
                                      </div>
                                   </div>
                                </div>
                            </div>
                        </form>
                    </li>
                    <li>
                        <li>
                            <a href="technologyDashboard.php"><i class="fa fa-database"></i> <span class="nav-label">Technologies</span></a>
                        </li>
                        <li>
                            <a href="/projects"><i class="fa fa-folder"></i> <span class="nav-label">Projects</span></a>
                        </li>
                        <li>
                            <a href="/organizations"><i class="fa fa-building"></i> <span class="nav-label">Organizations</span></a>
                        </li>
                        <li>
                            <a href="/attachments"><i class="fa fa-paperclip"></i> <span class="nav-label">Attachments</span></a>
                        </li>
                        <li>
                            <a href="/users"><i class="fa fa-users"></i> <span class="nav-label">Users</span></a>
                        </li>
                        <li class="dropdown">
                            <a aria-expanded="false" role="button" href="#" class="dropdown-toggle" data-toggle="dropdown"> Views <span class="caret"></span></a>
                            <ul role="menu" class="dropdown-menu">
                                <li><a href="projectCollections.php">projectCollections</a></li>
                                <li><a href="projectEntry.php">projectEntry</a></li>
                            </ul>
                        </li>
                        <li class="dropdown">
                            <a aria-expanded="false" role="button" href="#" class="dropdown-toggle" data-toggle="dropdown"> Elements <span class="caret"></span></a>
                            <ul role="menu" class="dropdown-menu">
                                <li class="active"><a href="cards.php">Cards</a></li>
                            </ul>
                        </li>
                    </ul>
                    <ul class="nav navbar-top-links navbar-right">
                        <li>
                            <span class="m-r-sm text-muted welcome-message">Welcome to TechDB</span>
                        </li>
                        <li>
                            <a href="login.html">
                                <i class="fa fa-sign-out"></i> Log out
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
  </div>
  <!-- fim -->
</div>
</div>
</div>
<!-- FOOTER HTML -->
<?php include "footer.php" ?>