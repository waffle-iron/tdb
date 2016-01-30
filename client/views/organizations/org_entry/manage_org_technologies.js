Template.manageOrgTechnologies.helpers({
  technologies() {
    let results =  SearchSouce.globalSearch.getData({
      transform(matchText, regExp) {
        return matchText.replace(regExp, '<b>$&</b>');
      },
      sort: {_score: -1}
    });
    return results;
  },
  inProject() {
    let organizationId = Template.instance().data.organizationId;
    let inProject = Organizations.findOne({
      _id: organizationId,
      technologiesId: this._id
    });

    return inProject;
  },
  getOptions() {
    return {
      types: ['technologies']
    };
  }
});

Template.manageOrgTechnologies.events({
  'click .add-technology': function(e, t) {
    Meteor.call('organizations/addTechnology', t.data.organizationId, this._id);
  },
  'click .remove-technology': function(e, t) {
    Meteor.call('organizations/removeTechnology', t.data.organizationId, this._id);
  }
});
