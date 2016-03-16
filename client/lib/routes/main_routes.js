FlowRouter.triggers.enter([AccountsTemplates.ensureSignedIn], {
  except: ['search']
});

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render('plainLayout', {
      main: 'errorPage',
      errorCode: 404
    });
  }
};

FlowRouter.route('/', {
  name: 'search',
  title: 'Search',
  triggersEnter: [function(context, redirect) {
    if (!Meteor.user()) {
      redirect('/signin');
    }
  }],
  action() {
    BlazeLayout.render('defaultLayout', {
      main: 'search'
    });
  },
});
