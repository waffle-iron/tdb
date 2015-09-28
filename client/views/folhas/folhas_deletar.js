Template.folhasDeletar.helpers({
	beforeRemove: function () {
      return function (collection, id) {
        var doc = collection.findOne(id);
        var object = this;
		alertify.confirm('Remover folha de <b>' + moment.months(doc.mes) + ' de ' + doc.ano + '</b>?', function(){
			object.remove();
		});
      };
    }	
})


