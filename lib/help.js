isAdmin = function() {
  return Meteor.userId() && Roles.userIsInRole(Meteor.userId(), ['admin']);
};

function safeFind() {
 if (_.isArray(array) && array.length) {
    return _.find(this.description, function(desc) {
      return desc.status === 'Published';
    });
  }
  return {};
}
