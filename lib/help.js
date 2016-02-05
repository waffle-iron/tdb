isAdmin = function() {
  return Meteor.userId() && Roles.userIsInRole(Meteor.userId(), ['admin', 'god']);
};

isEditor = function() {
  return Meteor.userId() && Roles.userIsInRole(Meteor.userId(), ['editor']);
};

function safeFind() {
 if (_.isArray(array) && array.length) {
    return _.find(this.description, function(desc) {
      return desc.status === 'Published';
    });
  }
  return {};
}
