Template.projectsEdit.helpers({
  project: function() {
    return Project.findOne({
      _id: FlowRouter.getParam('id')
    });
  }
});

AutoForm.hooks({
  updateProjectsForm: {
    onSuccess() {
        toastr.success('Project edited successfully: ' + this.currentDoc.nome, 'Sucess');
        FlowRouter.go('projects.index');
      },
      onError(formType, error) {
        toastr.error(error.toString, 'Error');
      },
  }
});
