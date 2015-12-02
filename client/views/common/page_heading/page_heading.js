Template.pageHeading.helpers({
	title:function(){
		var title = FlowRouter.current().route.options.title;
		FlowRouter.watchPathChange();
		return (typeof title === 'function') ? title(): title;
	}
});