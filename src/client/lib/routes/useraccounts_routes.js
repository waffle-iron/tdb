AccountsTemplates.configure({
  defaultLayout: 'defaultLayout',
  defaultLayoutRegions: {},
  defaultContentRegion: 'main',
  onLogoutHook: function() {
    FlowRouter.go('signin');
  },
  hideSignInLink: true,
  hideSignUpLink: true,
  showLabels: false,
  showForgotPasswordLink: true,
});

AccountsTemplates.configureRoute('signIn', {
  name: 'signin',
  path: '/signin',
  template: 'signin',
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
