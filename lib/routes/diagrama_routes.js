var diagramaRoutes = FlowRouter.group({
  prefix: '/diagrama',
  name:"Diagrama"
});

diagramaRoutes.route('/', {
  name: 'diagrama.index',
  title: "Diagrama",
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'diagrama'});
  },
});