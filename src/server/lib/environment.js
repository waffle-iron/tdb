Meteor.methods({
  env: function() {
    return process.env.NODE_ENV;
  }
});
