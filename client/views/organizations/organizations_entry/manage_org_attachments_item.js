Template.manageOrgAttachmentsItem.helpers({
  inAttachment() {
    let organizationId = Template.instance().data.organizationId;
    let inAttachment = Organizations.findOne({
      _id: organizationId,
      attachmentsId: this._id
    });

    return inAttachment;
  },
});

Template.manageOrgAttachmentsItem.events({
  'click .add-attachment': function(e, t) {
    Meteor.call('Organizations.methods.addAttachment', t.data.organizationId, this._id);
  },
  'click .remove-attachment': function(e, t) {
    Meteor.call('Organizations.methods.removeAttachment', t.data.organizationId, this._id);
  }
});
