Template.attachmentsBriefCard.helpers({
  options() {
    return {
      type: 'fetch'
    };
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
