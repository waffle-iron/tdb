AutoForm.hooks({
  insertCollectionsForm: {
    before: {
      method(doc) {
        console.log(this);
        doc.projectId = this.template.data.projectId;

        return doc;
      }
    },
    onSuccess() {
      toastr.success('Collection created successfully: ' + this.insertDoc.name, 'Success');
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  }
});
