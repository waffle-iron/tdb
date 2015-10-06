

Template._usersEscolherGrupo.helpers({
	roles:function(){
		return Meteor.roles.find();
	},
	checked:function(){
		///console.log(Template.instance().data._id);
		var userId = Template.instance().data._id;

		//var userId = Template.parentData(1)._id;
		var user = Meteor.users.findOne({_id:userId})
		return (this.name==user.role())?"active":"";
	}
})

Template._usersEscolherGrupo.events({
	"click .btn":function(e,tmpl){
		e.preventDefault();
		
		var userId = tmpl.data._id;

		//Session.set('toggledRole', this.name);
		Modal.hide();
		console.log(this.name);
		
		var role = this.name;
		alertify.confirm('Tem certeza?', function(){
			Meteor.call('updateRoles', userId,role, function(err,res){
				if (err) {
					console.log(err);
					toastr.error(err,"Erro")
				}else{
					toastr.success("Role setado: " + role, 'Sucesso');
				}
			});
		});
		
	}
})