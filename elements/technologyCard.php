<?php
$id = rand(0,2);
$technology = array
(
array("Drone Delivery","primary","http://emsowue.cloudimg.io/s/crop/500x300/http://si.wsj.net/public/resources/images/BN-AS240_gerdro_G_20131209114324.jpg","Relatively cheap drones with advanced sensors and imaging capabilities are giving farmers new ways to increase yields and reduce crop damage", "Published"),
array("Telehealth","danger","http://res.cloudinary.com/envisioning/image/upload/c_fill,g_center,h_400,w_600/v1/s3-staging/images/MtygmCTFcMyo7wCyX","Can be as simple as text messaging a family doctor, and as complex as using a health chair capable of medical examinations.", "Draft"),
array("Telepresence Robots","warning","http://res.cloudinary.com/envisioning/image/upload/c_fill,g_center,h_400,w_600/v1/s3-staging/images/5gzKXx88PgezXc4ua","Wheeled device with display and sensors, enabling users to remotely navigate environments and interact with people.", "Review")
);
?>
<!-- Começo tecnologia -->
<div class="cards-item">
    <div class="ibox technology-box">
        <div class="ibox-content no-padding techLabel panel-<?php echo $technology[$id][1]; ?>">
            <div class="technologyTools">
                <div class="btn-group">
                    <button data-toggle="dropdown"  class="btn btn-xs btn-outline btn-primary dropdown-toggle" aria-expanded="false"><i class="fa fa-database"></i> <span class="caret"></span></button>
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
            <a href="technologyEntry.php"><img src="<?php echo $technology[$id][2]; ?>" class="img-responsive" /></a>
            <div class="technology-desc">
                <div>
                    <h5 href="#" class="technology-name"><a href="technologyEntry.php"><span class="card-id">T0021</span> <?php echo $technology[$id][0]; ?></a></h5>
                    <div class="btn-group btn-xs btn-addons">
                        <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Readiness: 4"><i class="fa fa-bullseye"></i> 4</button>
                        <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Average Industry Impact: 4"><i class="fa fa-rocket"></i> 4</button>
                    </div>
                </div>
                <p><?php echo $technology[$id][3]; ?></p>
                <div class="btn-group">
                    <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="View Entry"><a href="technologyEntry.php"><i class="fa fa-eye"></i></a></button>
                    <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="Status is <?php echo $technology[$id][4]; ?>"><?php echo $technology[$id][4]; ?></button>
                    <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="11 attachments"><i class="fa fa-paperclip"></i> 11</button>
                    <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="02 projects"><i class="fa fa-folder-o"></i> 2</button>
                    <button class="btn btn-xs btn-outline btn-primary" data-toggle="tooltip" data-placement="top" title="" data-original-title="04 organizations"><i class="fa fa-building"></i> 4</button>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- Fim tecnologia -->