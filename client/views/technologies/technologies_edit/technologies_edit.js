Template.technologiesEdit.helpers({
  technology: function() {
    return Technologie.findOne({
      _id: FlowRouter.getParam('id')
    });
  }
});

AutoForm.hooks({
  updateTechnologiesForm: {
    onSuccess() {
        toastr.success('Technology edited successfully: ' + this.currentDoc.nome, 'Sucess');
        FlowRouter.go('technologies.index');
      },
      onError(formType, error) {
        toastr.error(error.toString, 'Error');
      },
  }
});
