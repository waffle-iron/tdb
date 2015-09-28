Template.fornecedores.onRendered(function(){
	var table = $('#fornecedoresDT').dataTable();
	$('#search-table').keyup(function () {
		table.fnFilter($(this).val());
	});
});


Template.fornecedoresAcoes.helpers({
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