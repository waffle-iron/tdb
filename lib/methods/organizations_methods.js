Meteor.methods({
  'organizations/add': function(doc) {
    check(doc, Schemas.Organization);

    let id = Organizations.insert(doc);

    return id;
  },
  'organizations/addProject': function(orgId, projectId) {
    check(projectId, String);
    check(orgId, String);
    Organizations.update({
      _id: orgId
    }, {
      $addToSet: {
        projectsId: projectId
      }
    });
  },
  'organizations/removeProject': function(orgId, projectId) {
    check(projectId, String);
    check(orgId, String);
    Organizations.update({
      _id: orgId
    }, {
      $pull: {
        projectsId: projectId
      }
    });
  },
  'organizations/addTechnology': function(orgId, techId) {
    check(techId, String);
    check(orgId, String);
    Organizations.update({
      _id: orgId
    }, {
      $addToSet: {
        technologiesId: techId
      }
    });
  },
  'organizations/removeTechnology': function(orgId, techId) {
    check(techId, String);
    check(orgId, String);
    Organizations.update({
      _id: orgId
    }, {
      $pull: {
        technologiesId: techId
      }
    });
  }
});
