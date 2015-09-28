Template.usersView.helpers({
	user: function(){
		return Meteor.users.findOne({_id: FlowRouter.getParam('id')});
	}
})