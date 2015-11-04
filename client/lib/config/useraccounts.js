var onSubmitHook = function(error,state){
  if (!error) {
    if (state === "resetPwd") {
      console.log(Meteor.userId());
      Meteor.users.update({_id:Meteor.userId()},{
        $set:{
            'info.ativouEm': moment.utc().toDate()
        }});
    }  
  }
}

AccountsTemplates.configure({
    defaultLayout: 'defaultLayout',
    defaultLayoutRegions: {},
    defaultContentRegion: 'main',
    onSubmitHook: onSubmitHook,
    onLogoutHook: function(){FlowRouter.go('signin');},
    preSignUpHook: function(password,info){
        info.profile.token = FlowRouter.getParam('token');
        console.log(info);
    },
    hideSignInLink: true,
    hideSignUpLink: true,
    showLabels:false,
    showForgotPasswordLink: true,

});



AccountsTemplates.configureRoute('signIn', {
    name: 'signin',
    path: '/login',
    template: 'login',
    layoutTemplate: 'plainLayout',
    layoutRegions: {},
    contentRegion: 'main'
});

AccountsTemplates.configureRoute('enrollAccount', {
    name: 'enrollaccount',
    path: '/enroll-account',
    template: 'enrollAccount',
    layoutTemplate: 'plainLayout',
    layoutRegions: {},
    contentRegion: 'main'
});

AccountsTemplates.configureRoute('signUp', {
    name: 'signup',
    path: '/register',
    template: 'register',
    layoutTemplate: 'plainLayout',
    layoutRegions: {},
    contentRegion: 'main'
});

AccountsTemplates.configureRoute('resetPwd', {
    name: 'resetPwd',
    path: '/reset-password',
    template: 'resetPwd',
    layoutTemplate: 'plainLayout',
    layoutRegions: {},
    contentRegion: 'main'
});






T9n.setLanguage('pt');
