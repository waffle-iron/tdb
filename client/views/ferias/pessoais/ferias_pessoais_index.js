Template.feriasPessoais.onRendered(function(){
	var feriasPessoaisDT = $('#feriasPessoaisDT').DataTable();
	
	if (!Roles.userIsInRole(Meteor.userId(),['admin','gestor'])){
		//feriasColetivasDT.column(1).visible(false);
		//feriasPessoaisDT.column(1).visible(false);
	}

});



Template.feriasPessoaisAcoes.helpers({
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