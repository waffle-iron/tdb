Organizations.methods = {};


validatedMethodUpdateSchema = new SimpleSchema({
  _id: {
    type: String
  },
  modifier: {
    type: Object,
    blackbox: true
  }
});

Organizations.methods.update = new ValidatedMethod({
  name: 'Organizations.methods.update',
  validate: validatedMethodUpdateSchema.validator(),
  run({_id, modifier}) {
    return Organizations.update(_id, modifier);
  }
});


Meteor.methods({
  'Organizations.methods.addProject': function(orgId, projectId) {
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
  'Organizations.methods.removeProject': function(orgId, projectId) {
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
  'Organizations.methods.addTechnology': function(orgId, techId) {
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
  'Organizations.methods.removeTechnology': function(orgId, techId) {
    check(techId, String);
    check(orgId, String);
    Organizations.update({
      _id: orgId
    }, {
      $pull: {
        technologiesId: techId
      }
    });
  },
  'Organizations.methods.setLogo': function(orgId, imageId) {
    check(orgId, String);
    check(imageId, String);
    Organizations.update({
      _id: orgId
    }, {
      $set: {
        logo: imageId
      }
    });
  }
});
