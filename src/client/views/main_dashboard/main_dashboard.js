Template.mainDashboard.helpers({
  technologiesCount() {
    return Counts.get('docCounter-technologies');
  },
  organizationsCount() {
    return Counts.get('docCounter-organizations');
  },
  projectsCount() {
    return Counts.get('docCounter-projects');
  },
  attachmentsCount() {
    return Counts.get('docCounter-attachments');
  }
});

Template.mainDashboard.onCreated(function() {
  this.subscribe('docCounter');
});
