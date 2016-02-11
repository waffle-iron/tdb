Template.attachmentAboutBox.onRendered(function(){
  $('.attachment-image').load(() => {
    console.log('image loaded');
    console.log(this.data);
  });

});

Template.attachmentAboutBox.helpers({
  user() {
    return Meteor.users.findOne({
      _id: this.createdBy
    })
  },

  relatedProjects() {
    return Projects.find({
      attachmentsId: {
        $in: [this._id]
      }
    })
  },
  relatedTechnologies() {
    return Technologies.find({
      attachmentsId: {
        $in: [this._id]
      }
    })
  },
  relatedOrganizations() {
    return Organizations.find({
      attachmentsId: {
        $in: [this._id]
      }
    })
  },
})
