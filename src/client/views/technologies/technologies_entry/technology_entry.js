import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';

Template.technologiesEntry.onCreated(function() {
  this.subscribe('technologies.single', FlowRouter.getParam('id'));
});

Template.technologiesEntry.helpers({
  tech: () => Technologies.findOne(FlowRouter.getParam('id')),
});
