Template.usersView.helpers({
	user: function(){
		return Meteor.users.findOne({_id: FlowRouter.getParam('id')});
	},
	beforeRemove: function () {
      return function (collection, id) {
        var doc = collection.findOne(id);
        var object = this;
		alertify.confirm('Remover <b>' + doc.emails[0].address + '</b>?', function(){
			object.remove();
		});
      };
    },
	onSuccess: function () {
      //return function (result) { alert("YAY!"); console.log(result); };
      return function(result){
      	FlowRouter.go('users.index');
      	console.log(result);
      }
    },
})

Template.usersView.events({
	'click #escolher-grupo':function(){
		Modal.show('_usersEscolherGrupo',{_id: FlowRouter.getParam('id')});
	},	
})

