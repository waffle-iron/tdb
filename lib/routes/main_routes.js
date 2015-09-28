FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn]);

FlowRouter.notFound = {
    action: function() {
    	BlazeLayout.render("plainLayout", {main: "errorPage",errorCode:500});
    }
};

FlowRouter.route('/', {
    name: "main.index",
    title: "Início",
    action: function(params) {
	    BlazeLayout.render("defaultLayout", {main: "dashboard"});
    },

});