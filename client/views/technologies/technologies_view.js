Template.technologiesView.helpers({
  technologiesCardData() {
    let technology = Technologies.findOne({_id: FlowRouter.getParam('id')});

    return technology && {
      name: technology.name,
      imageUrl: technology.getShowcasedImage().src,
      shortText: technology.getPublishedDescription().shortText,
      tags: technology.tags,
      attachmentsCount: technology.attachments && technology.attachments.length || 0,
      organizationsCount: technology.organizations && technology.organizations.length || 0,
      projectsCount: technology.projects && technology.projects.length || 0,
      readinessScore: 1,
      impactScore: 2,
      status: technology.status
    };
  }
});
