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


/*

diagramaRoutes.route('/2', {
  name: 'diagrama.index2',
  title: "Diagrama",
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'diagrama2'});
  },
});

*/