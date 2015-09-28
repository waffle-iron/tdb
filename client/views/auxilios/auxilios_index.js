Template.auxilios.rendered = function(){
	var table = $('#auxiliosDT').dataTable();
	$('#search-table').keyup(function () {
		table.fnFilter($(this).val());
	});
}


Template.auxiliosAcoes.helpers({
	beforeRemove: function () {
      return function (collection, id) {
        var doc = collection.findOne(id);
        var object = this;
		alertify.confirm('Remover <b>' + doc.nome + '</b>?', function(){
			object.remove();
		});
      };
    }
})