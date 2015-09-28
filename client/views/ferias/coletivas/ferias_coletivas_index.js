Template.feriasColetivas.onRendered(function(){
	var feriasColetivasDT = $('#feriasColetivasDT').DataTable();
	
	if (!Roles.userIsInRole(Meteor.userId(),['admin','gestor'])){
		//feriasColetivasDT.column(1).visible(false);
		//feriasPessoaisDT.column(1).visible(false);
	}

});

Template.feriasColetivas.helpers({

})


Template.feriasColetivasAcoes.helpers({
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