import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { AutoForm } from 'meteor/aldeed:autoform';


import { TechnologiesDescriptions } from '../../../api/technologies_descriptions/technologies_descriptions.js';
import { insert, publish, remove, update } from '../../../api/technologies_descriptions/methods.js';
import './technologies_descriptions_tabs.html';


AutoForm.hooks({
  updateTechnologyDescriptionForm: {
    onError(error) {
      toastr.error(error.error);
    },
    onSuccess() {
      toastr.success('Description saved successfully');
      // this.template.get('isEditing').set(false);
    },
  },
});

Template.technologiesDescriptionsTabs.onCreated(function() {
  this.isEditing = new ReactiveVar;
  this.currentId = new ReactiveVar;

  if (this.data.fetch() && this.data.fetch().length > 0) {
    this.currentId.set(this.data.fetch()[0]._id);
  }

  this.autorun(() => {
    if (this.currentId.get()) {
      this.subscribe('technologies_descriptions.single', this.currentId.get());
    }
  });
});

Template.technologiesDescriptionsTabs.events({
  'click [data-action="toggle-form"]': function(event, template) {
    template.isEditing.set(true);
  },
  'click [data-toggle="tab"]': function(event, template) {
    template.currentId.set(this._id);
  },
  'click [data-action="publish-description"]': function(event, template) {
    swal({
      title: 'Are you sure?',
      text: 'Confirm to publish this description. This will set the current pulished description to <b>draft</b>.',
      type: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      closeOnConfirm: true,
      html: true
    }, () => {
      const description = TechnologiesDescriptions.findOne(template.currentId.get());

      publish.call({
        technologyId: description.technologyId,
        descriptionId: description._id
      }, (err, res) => {
        if (err) {
          toastr.error(err.error, 'Error');
          throw err;
        }
        return toastr.success('The description was published!', 'Success');
      });
    });
  },
  'click [data-action="delete-description"]': function(event, template) {
    swal({
      title: 'Are you sure?',
      text: "Confirm to delete this description. This action can't be undone",
      type: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#DD6B55',
      closeOnConfirm: true,
      html: true
    }, () => {
      Meteor.call('Technologies.methods.deleteDescription', template.currentDescription.get()._id, (err, res) => {
        if (err) toastr.error(err.error, 'Success');
        toastr.success('The description was deleted!', 'Success');
      });
    });
  }
});

Template.technologiesDescriptionsTabs.helpers({
  isFirstItem: (index) => index === 0,
  isEditing: () => Template.instance().isEditing.get(),
  isStatusPublished: (status) => status === 'published',
  currentDescription() {
    const _id = Template.instance().currentId.get();
    return TechnologiesDescriptions.findOne(_id);
  }
});
