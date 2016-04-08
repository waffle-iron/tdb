Meteor.publishComposite('tabularProjectsList', function(tableName, ids, fields) {
  check(tableName, String);
  check(ids, Array);
  check(fields, Match.Optional(Object));
  this.unblock();
  return {
    find() {
      this.unblock();
      return Projects.find({
        _id: {
          $in: ids
        }
      }, {
        fields: fields
      });
    },
  };
});


Meteor.publishComposite('projects.single', function(projectId) {
  check(projectId, String);
  this.unblock();
  return {
    find() {
      this.unblock();
      return Projects.find({
        _id: projectId
      });
    },
    children: [{
      find(project) {
        return CollectionsSet.find({ projectId: project._id });
      }
    }]
  };
});

Meteor.publish('projects.quickList', function() {
  return Projects.find({}, {
    fields: {
      name: 1
    }
  });
});

Meteor.publish('projects-status-counter', function() {
  Counts.publish(this, 'projects-prospect', Projects.find({
    status: 'prospect'
  }));
  Counts.publish(this, 'projects-open', Projects.find({
    status: 'open'
  }));
  Counts.publish(this, 'projects-closed', Projects.find({
    status: 'closed'
  }));
});

Meteor.publish('last-project-added', function() {
  return Projects.find({}, {
    sort: {
      createdAt: -1
    },
    limit: 1
  });
});
