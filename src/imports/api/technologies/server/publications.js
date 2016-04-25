import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Counts } from 'meteor/tmeasday:publish-counts';

import { Technologies } from '../technologies.js';
import { TechnologiesDescriptions } from '../../technologies_descriptions/technologies_descriptions';

Meteor.publishComposite('technologies.single', function(technologyId) {
  check(technologyId, String);
  this.unblock();

  return {
    find() {
      this.unblock();
      return Technologies.find({
        _id: technologyId
      });
    },
    children: [{
      find(technology) {
        if (technology.images) {
          let imagesId = _.pluck(technology.images, 'src') || [];
          return Images.find({
            _id: {
              $in: imagesId
            }
          });
        }
      },
    }, {
      find(technology) {
        return TechnologiesDescriptions.find({
          _id: {
            $in: technology.descriptionsId ? technology.descriptionsId : []
          }
        });
      }
    }]
  };
});

Meteor.publish('technologies.quickList', function() {
  return Technologies.find({}, {
    fields: {
      name: 1
    }
  });
});

Meteor.publish('technologies-status-counter', function() {
  Counts.publish(this, 'technologies-published', Technologies.find({
    status: 'published'
  }));
  Counts.publish(this, 'technologies-review', Technologies.find({
    status: 'review'
  }));
  Counts.publish(this, 'technologies-draft', Technologies.find({
    status: 'draft'
  }));
});

Meteor.publish('last-technology-added', function() {
  return Technologies.find({}, {
    sort: {
      createdAt: -1
    },
    limit: 1
  });
});


Meteor.publish('technology.status', function(techId) {
  check(techId, String);

  return Technologies.find({
    _id: techId
  }, {
    fields: {
      status: 1
    }
  });
});
