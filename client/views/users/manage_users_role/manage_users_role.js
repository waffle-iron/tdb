Template.manageUserRole.helpers({
  users() {
    let result = SearchSources.userSearch.getData({
      transform(matchText, regExp) {
        return matchText.replace(regExp, '<b>$&</b>');
      },
      sort: {_score: -1}
    });
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
