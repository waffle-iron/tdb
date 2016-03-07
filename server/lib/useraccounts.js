Accounts.urls.enrollAccount = function(token) {
  return Meteor.absoluteUrl('enroll-account/' + token);
};

Accounts.urls.resetPassword = function(token) {
  return Meteor.absoluteUrl('reset-password/' + token);
};

Accounts.onCreateUser(function(options, user) {
  if (options.info) {
    user.info = options.info;
  }
  user.profile = options.profile || {};
  return user;
});
