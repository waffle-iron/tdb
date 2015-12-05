Template.usersChangeImage.events({
  'change #upload-image': function(e, tmpl) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(ev) {
      tmpl.currentImage.set(ev.target.result);
    };
  },
  'click #upload-image': function(e, tmpl) {
    let file = tmpl.currentImage.get();
    if (!file) return;
    Images.insert(file, function(err, fileObj) {
      if (err) {
        return toastr.error('some error occurred', 'Error');
      }

      Meteor.users.update({
        _id: FlowRouter.getParam('id')
      }, {
        $set: {
          'profile.imageId': fileObj._id
        }
      });
      return toastr.success('file uploaded!', 'Success');
    });
  },
  'click #take-photo': function(e, tmpl) {
    MeteorCamera.getPicture({
      quality: 100,
      width: 640,
      height: 360
    }, (err, data) => {
      if (err) {
        return toastr.error('Error taking photo', 'Error');
      }

      tmpl.currentImage.set(data);
    });
  }
});

Template.usersChangeImage.onCreated(function() {
  this.currentImage = new ReactiveVar;
});

Template.usersChangeImage.helpers({
  currentImage() {
    return Template.instance().currentImage.get();
  }
});
