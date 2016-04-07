Template.projectsEntry.onCreated(function() {
  this.subscribe('projects.single', FlowRouter.getParam('id'));
});

Template.projectsEntry.helpers({
  project() {
    return Projects.findOne({
      _id: FlowRouter.getParam('id')
    });
  }
});
