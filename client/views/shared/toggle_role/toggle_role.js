

Template.toggleRole.helpers({
	roles:function(){
		return Meteor.roles.find();
	},
	checked:function(){

		var userId = Template.parentData(1)._id;
		var user = Meteor.users.findOne({_id:userId})
		
		
		
		return (this.name==user.role())?"active":"";
	}
})

Template.toggleRole.events({
	"click .btn":function(e){
		e.preventDefault();
		var userId = Template.currentData()._id;		
		Session.set('toggledRole', this.name);

		alertify.confirm('Tem certeza?', function(){
			Meteor.call('updateRoles', userId, Session.get('toggledRole'), function(err,res){
				if (err) {
					console.log(err);
					toastr.error(err,"Erro")
				}else{
					toastr.success("Role setado: " + Session.get('toggledRole'), 'Sucesso');
				}
			});
		});
	}
})