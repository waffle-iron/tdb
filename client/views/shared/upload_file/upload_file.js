const TAKE_PICTURE_QUALITY = 100;
const TAKE_PICTURE_WIDTH = 640;
const TAKE_PICTURE_HEIGHT = 360;

Template.uploadFile.events({
  'change #select-image': function(e, tmpl) {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(ev) {
      tmpl.currentImage.set(ev.target.result);
    };
  },
  'click #upload-image': function(e, tmpl) {
    let croppedImageData = tmpl.croppedImage.cropper('getCroppedCanvas').toDataURL();
    //let file = tmpl.currentImage.get();
    if (!croppedImageData) return;
    let uploadedImage = Images.insert(croppedImageData, function(err, fileObj) {
      if (err) {
        return toastr.error('Some error occurred', 'Error');
      }
      tmpl.data.onUpload(fileObj)
        //  Meteor.call('users.setUserImage', FlowRouter.getParam('id'), fileObj._id);

      let cursor = Images.find(fileObj._id);
      let liveQuery = cursor.observe({
        changed(newImage) {
          if (newImage.isUploaded()) {
            liveQuery.stop();
            Meteor.setTimeout(() => {
              Modal.hide();
              return toastr.success('File uploaded!', 'Success');
            }, 1000);
          }
        }
      });
    });

    tmpl.uploadingImage.set(uploadedImage._id);
  },
  'click #take-photo': function(e, tmpl) {
    MeteorCamera.getPicture({
      quality: TAKE_PICTURE_QUALITY,
      width: TAKE_PICTURE_WIDTH,
      height: TAKE_PICTURE_HEIGHT
    }, (err, data) => {
      if (err) {
        return toastr.error('Error taking photo', 'Error');
      }

      tmpl.currentImage.set(data);
    });
  }
});

Template.uploadFile.onCreated(function() {
  this.currentImage = new ReactiveVar;
  this.uploadingImage = new ReactiveVar;
});

Template.uploadFile.helpers({
  currentImage() {
      return Template.instance().currentImage.get();
    },
    uploadingImage() {
      return Template.instance().uploadingImage.get();
    },
    getCropper() {
      let tmpl = Template.instance();
      return function(cropper) {
        tmpl.croppedImage = cropper;
      };
    }
});

