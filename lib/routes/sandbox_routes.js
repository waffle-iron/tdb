let sandboxRoutes = FlowRouter.group({
    prefix: '/sandbox',
    name: 'Sandbox'
});

sandboxRoutes.route('/', {
    name: 'sandbox.index',
    title: 'Sandbox',
    action() {
        BlazeLayout.render('defaultLayout', {
            main: 'sandbox'
        });
    }
});
