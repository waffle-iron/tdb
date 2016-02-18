Template.manageUserRole.helpers({
  users() {
    let result = SearchSources.userSearch.getTransformedData();
    console.log(result);
    return result;
  },
  getOptions() {
    return {
      types: ['users']
    };
  },
  getRolesForUser() {
    return Roles.getRolesForUser(this._id)[0];
  }
});

Template.manageUserRole.onCreated(function() {
  this.subscribe('Users.roles');
});
