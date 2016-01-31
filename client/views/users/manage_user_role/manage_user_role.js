Template.manageUserRole.helpers({
  users() {
    let result = SearchSources.userSearch.getData({
      transform(matchText, regExp) {
        return matchText.replace(regExp, '<b>$&</b>');
      },
      sort: {_score: -1}
    });
    console.log(result);

    return result;
  },
  getOptions() {
    return {
      types: ['users']
    };
  },
  getRolesForUser() {
    console.log(this._id);
    console.log(Roles.getRolesForUser(this._id));
    return Roles.getRolesForUser(this._id)[0];
  }
});
