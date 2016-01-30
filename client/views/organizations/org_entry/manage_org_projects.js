Template.manageOrgProjects.helpers({
  projects() {
    return SearchSources.globalSearch.getData({
      transform(matchText, regExp) {
        return matchText.replace(regExp, '<b>$&</b>');
      },
      sort: {_score: -1}
    });
  },
  inProject() {
    let organizationId = Template.instance().data.organizationId;
    let inProject = Organizations.findOne({
      _id: organizationId,
      projectsId: this._id
    });

    return inProject;
  },
  getOptions() {
    return {
      types: ['projects']
    };
  }
});


Template.manageOrgProjects.events({
    /*
  'input #search-projects': function(e) {
    let el = $(e.target);
    let searchText = el.val();
    globalSearch.search(searchText, {
      types: ['projects']
    });
  },
  */
  'click .add-project': function(e, t) {
    Meteor.call('organizations/addProject', t.data.organizationId, this._id);
  },
  'click .remove-project': function(e, t) {
    Meteor.call('organizations/removeProject', t.data.organizationId, this._id);
  }
});
