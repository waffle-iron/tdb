let sandboxRoutes = FlowRouter.group({
    prefix: '/sandbox',
    name: 'Sandbox'
});

sandboxRoutes.route('/', {
    name: 'sandbox.technologyCard',
    title: 'Technology Card Viz',
    action() {
        BlazeLayout.render('defaultLayout', {
            main: 'technologyCard'
        });
    }
});
