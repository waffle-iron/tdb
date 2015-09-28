Template.users.rendered = function(){
	var table = $('#usersDT').dataTable();
	$('#search-table').keyup(function () {
		table.fnFilter($(this).val());
	});

	/*

	$('#daterange').daterangepicker(
	  { 
	    format: 'YYYY-MM-DD',
	    startDate: '2013-01-01',
	    endDate: '2013-12-31'
	  },
	  function(start, end, label) {
	    alert('A date range was chosen: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD'));
	  }
	);	
*/
}


Template.usersAcoes.helpers({
	beforeRemove: function () {
      return function (collection, id) {
        var doc = collection.findOne(id);
        var object = this;
		alertify.confirm('Remover <b>' + doc.emails[0].address + '</b>?', function(){
			object.remove();
		});
      };
    }
})
