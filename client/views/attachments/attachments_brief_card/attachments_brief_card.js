Template.attachmentsBriefCard.helpers({
  fetchOptions() {
    return {
      type: 'fetch'
    };
  },
  isFromWeb() {
    return this.from === 'web';
  },
  classIconName() {
    console.log(this);
    switch (this.file.type) {
      case 'application/pdf':
        return 'fa fa-file-pdf-o';

      case 'image/jpg':
      case 'image/png':
      case 'image/jpeg':
        return 'fa fa-file-image-o';

      default:
        return 'fa fa-file-o';
    }
  },
  isImage() {
    return this.file.type.indexOf('image') === 0;
  },
  onDelete() {
    let identification = this.name;
    let _id = this._id;
    return function(data, t) {
      removeConfirmation(identification, () => {
        Meteor.call('Attachments.methods.remove', _id, (err, res) => {
          if (err) {
            return removeError();
          }
          removeSuccess();
          t.state.set('deleted');
        });
      });
    };
  },
  onEdit() {
    identification = this.name;
    return function(data, t) {
      Modal.show('attachmentsEdit', {
        attachmentId: data._id,
        onSuccess() {
          t.state.set('updated');
        }
      });
    };
  }
});
