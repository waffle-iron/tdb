var arvoreRoutes = FlowRouter.group({
  prefix: '/arvore',
  name:"Árvore"
});

arvoreRoutes.route('/', {
  name: 'arvore.index',
  title: "Árvore",
  action: function() {
    BlazeLayout.render('defaultLayout', {main: 'arvore'});
  },
});
