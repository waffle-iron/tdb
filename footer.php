<div class="footer">
	<div class="pull-right">
		10GB of <strong>250GB</strong> Free.
	</div>
	<div>
		<strong>Copyright</strong> Example Company &copy; 2014-2015
	</div>
</div>
</div>
</div>
</div>
<!-- Mainly scripts -->
<script src="js/jquery-2.1.1.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/plugins/metisMenu/jquery.metisMenu.js"></script>
<script src="js/plugins/slimscroll/jquery.slimscroll.min.js"></script>
<!-- Custom and plugin javascript -->
<script src="js/inspinia.js"></script>
<script src="js/plugins/pace/pace.min.js"></script>
<script src="js/plugins/masonary/masonry.pkgd.min.js"></script>
<script>
$(document).ready(function() {
$(".sortable-list").sortable({
connectWith: ".connectList"
}).disableSelection();
});
</script>
<style>
.cards-box {
margin: 0 auto;
}
.cards-box .ibox {
margin-bottom: 0;
}
.cards-item {
margin-bottom: 15px;
width: 230px;
}
</style>
<script>
$(window).load(function() {
$('.cards-box').masonry({
// options
itemSelector: '.cards-item',
columnWidth: 230,
gutter: 15
});
});
</script></body>
</html>