Template.manageOrgTechnologiesItem.helpers({
  inProject() {
    let organizationId = Template.instance().data.organizationId;
    let inProject = Organizations.findOne({
      _id: organizationId,
      technologiesId: this._id
    });

    return inProject;
  },
});

Template.manageOrgTechnologies.events({
  'click .add-technology': function(e, t) {
    Meteor.call('Organizations.methods.addTechnology', t.data.organizationId, this._id);
  },
  'click .remove-technology': function(e, t) {
    Meteor.call('Organizations.methods.removeTechnology', t.data.organizationId, this._id);
  }
});
