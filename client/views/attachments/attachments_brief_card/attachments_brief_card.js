Template.attachmentsBriefCard.helpers({
  options() {
    return {
      type: 'fetch'
    };
  },
  thumbnailUrl() {
    // Just working for images right now
    switch (this.from) {
      case 'web':
        return this.web.thumbnailUrl;
      default:
        return this.file.s3Url;
    }
  },
  //
  //  Delete Handler
  //
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
  //
  //  Edit handler
  //
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
