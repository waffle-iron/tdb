Template.areasView.helpers({
	area:function(){
		return Areas.findOne({_id:FlowRouter.getParam('id')});
	}
})