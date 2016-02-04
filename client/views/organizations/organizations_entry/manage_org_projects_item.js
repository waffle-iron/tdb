Template.manageOrgProjectsItem.helpers({
  inProject() {
    let organizationId = Template.instance().data.organizationId;
    let inProject = Organizations.findOne({
      _id: organizationId,
      projectsId: this._id
    });

    return inProject;
  },
});

Template.manageOrgProjectsItem.events({
  'click .add-project': function(e, t) {
    Meteor.call('Organizations.methods.addProject', t.data.organizationId, this._id);
  },
  'click .remove-project': function(e, t) {
    Meteor.call('Organizations.methods.removeProject', t.data.organizationId, this._id);
  }
});
