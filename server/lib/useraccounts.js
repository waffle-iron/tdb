
Accounts.urls.enrollAccount = function (token) {
        return Meteor.absoluteUrl('enroll-account/' + token);
};

Accounts.urls.resetPassword = function (token) {
        return Meteor.absoluteUrl('reset-password/' + token);
};

Accounts.onCreateUser(function(options, user) {
  console.log(options);

  if (options.info) {
    user.info = options.info;
  }

  user.profile = options.profile || {};
  return user;
});


Meteor.publish(null, function() {
// automatically publish the userType for the connected user
// no subscription is necessary
return Meteor.users.find({}, {fields: {info: 1,roles:1,criadoEm:1,criadoPorId:1,emails:1,status:1}});
});

