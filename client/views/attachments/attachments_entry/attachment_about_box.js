Template.attachmentAboutBox.helpers({
  user: function() {
    return Meteor.users.findOne({
      _id: this.createdBy
    })
  },

  relatedProjects: function() {
    return Projects.find({
      attachmentsId: {
        $in: [this._id]
      }
    })
  },
  relatedTechnologies: function() {
    return Technologies.find({
      attachmentsId: {
        $in: [this._id]
      }
    })
  },
  relatedOrganizations: function() {
    return Organizations.find({
      attachmentsId: {
        $in: [this._id]
      }
    })
  },
})
