//
//  TODO: SEARCH SOLUTION
//  $elemMatch with $regex is NOT WORKING on minimongo


Template.techStash.events({
  'click .add-to-stash': function(event, template) {
    Modal.show('techStashAdd', {
      projectId: template.data.projectId
    });
  },
  'input .stash-filter': function(e, t) {
    t.filter.set($(e.target).val());
  }
});

Template.techStash.helpers({
  filteredTechnologiesStash() {
    let filteredProject = Projects.findOne({
      _id: this.projectId
    });
    return filteredProject && filteredProject.technologiesStash || [];
  },
  getTechnology() {
    return Technologies.findOne(this.technologyId);
  }
});

Template.techStash.onRendered(function() {
  if (this.data.style === 'vertical') {
    let drake = Template.instance().data.drake;
    drake.containers.push(this.find('.stash-drag-area'));
  }
});

Template.techStash.onCreated(function() {
  this.filter = new ReactiveVar('');
});
