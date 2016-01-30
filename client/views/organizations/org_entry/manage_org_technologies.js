Template.manageOrgTechnologies.helpers({
  technologies() {
    let results =  globalSearch.getData({
      transform(matchText, regExp) {
        return matchText.replace(regExp, '<b>$&</b>');
      },
      sort: {_score: -1}
    });
    return results;
  },
  metadata() {
    return globalSearch.getMetadata();
  },
  searchStatus() {
    return globalSearch.getStatus();
  },
  inProject() {
    let organizationId = Template.instance().data.organizationId;
    let inProject = Organizations.findOne({
      _id: organizationId,
      technologiesId: this._id
    });

    return inProject;
  }
});

Template.manageOrgProjects.onCreated(function() {
  globalSearch.cleanHistory();
});

Template.manageOrgTechnologies.onCreated(function() {
  globalSearch.cleanHistory();
});

Template.manageOrgTechnologies.events({
  'input #search-technologies': function(e) {
    let el = $(e.target);
    let searchText = el.val();
    globalSearch.search(searchText, {
      types: ['technologies']
    });
  },
  'click .add-technology': function(e, t) {
    Meteor.call('organizations/addTechnology', t.data.organizationId, this._id);
  },
  'click .remove-technology': function(e, t) {
    Meteor.call('organizations/removeTechnology', t.data.organizationId, this._id);
  }
});
