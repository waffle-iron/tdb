import { Template } from 'meteor/templating';
import { AutoForm } from 'meteor/aldeed:autoform';
import { FlowRouter } from 'meteor/kadira:flow-router';

AutoForm.hooks({
  'update-technologies-information-form': {
    onSuccess() {
      let key = $(this.autoSaveChangedElement).attr('data-schema-key');
      toastr.success(`Technology <b>${key}</b> updated successfully`, 'Success');
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    },
  },
  'update-technologies-relations-form': {
    onSuccess() {
      toastr.success(`Technology relations updated successfully`, 'Success');
    },
    onError(formType, error) {
      toastr.error(error.toString(), 'Error');
    }
  }
});

Template.technologiesEdit.onCreated(function() {
  this.subscribe('technologies.single', FlowRouter.getParam('id'));
  this.subscribe('projects.quickList');
  this.subscribe('organizations.quickList');
  this.subscribe('attachments.quickList');
});

Template.technologiesEdit.helpers({
  tech() {
    return Technologies.findOne(FlowRouter.getParam('id'));
  },
});

