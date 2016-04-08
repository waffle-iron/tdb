/*AutoForm.hooks({
  pushCollectionsSetFrom: {
    onSubmit(insertDoc) {
      console.log(this.template.data);

      Projects.methods.pushCollectionsSet.call({
        projectId: this.template.data.projectId,
        collectionsSet: insertDoc
      }, (err, res) => {
        err && this.done(err);
        res && this.done(null, res);
      });

      return false;
    },
    onSuccess() {
      toastr.success('Collection created successfully: ' + this.insertDoc.name, 'Success');
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});*/


AutoForm.hooks({
  insertCollectionsSetForm: {
    before: {
      method(doc) {
        doc.projectId = this.template.data.projectId;

        return doc;
      }
    },
    onSuccess() {
      toastr.success('Collection created successfully: ' + this.insertDoc.name, 'Success');
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    }    
  }
});

Template.collectionsSetAdd.helpers({
  project() {
    return Projects.findOne({
      _id: Template.instance().data.projectId
    }, {
      fields: {
        _id: 1
      }
    });
  }
});