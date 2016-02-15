Organizations.methods = {};

Organizations.methods.add = new ValidatedMethod({
  name: 'Organizations.methods.add',
  validate: Schemas.Organization.validator(),
  run(doc) {
    return Organizations.insert(doc);
  }
});


Organizations.methods.update = new ValidatedMethod({
  name: 'Organizations.methods.update',
  validate: Schemas.validatedMethodUpdateSchema.validator(),
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
  'Organizations.methods.addAttachment': function(orgId, attchId) {
    check(attchId, String);
    check(orgId, String);
    Organizations.update({
      _id: orgId
    }, {
      $addToSet: {
        attachmentsId: attchId
      }
    });
  },
  'Organizations.methods.removeAttachment': function(orgId, attchId) {
    check(attchId, String);
    check(orgId, String);
    Organizations.update({
      _id: orgId
    }, {
      $pull: {
        attachmentsId: attchId
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
  },
  'Organizations.methods.remove': function(orgId) {
    check(orgId, String);
    return Organizations.remove({_id: orgId});
  }
});
