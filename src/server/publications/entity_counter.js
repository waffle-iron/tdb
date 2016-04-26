import { Technologies } from '../../imports/api/technologies/technologies.js';

Meteor.publish('docCounter', function() {
  Counts.publish(this, 'docCounter-technologies', Technologies.find());
  Counts.publish(this, 'docCounter-organizations', Organizations.find());
  Counts.publish(this, 'docCounter-projects', Projects.find());
  Counts.publish(this, 'docCounter-attachments', Attachments.find());
});
