Template.manageUserProjects.helpers({
  projects() {
    return SearchSources.globalSearch.getData({
      transform(matchText, regExp) {
        return matchText.replace(regExp, '<b>$&</b>');
      },
      sort: {_score: -1}
    });
  },

  getOptions() {
    return {
      types: ['projects']
    };
  },
  user(){
    let user = Meteor.users.findOne({
      _id: FlowRouter.getParam('id')
    });

    return user;
  },
});

