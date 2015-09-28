Template.feriados.onRendered(function(){
	var table = $('#feriadosDT').dataTable();
	$('#search-table').keyup(function () {
		table.fnFilter($(this).val());
	});
});


Template.feriadosAcoes.helpers({
	beforeRemove: function () {
      return function (collection, id) {
        var doc = collection.findOne(id);
        var object = this;
		alertify.confirm('Remover?', function(){
			object.remove();
		});
      };
    }
})