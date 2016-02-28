Roles.helpers = {
  isAdminOrEditor() {
    let user = Meteor.user();
    return user && Roles.userIsInRole(user, ['admin', 'editor']);
  }
};

Template.registerHelper('isAdminOrEditor', function() {
  return Roles.helpers.isAdminOrEditor();
});
