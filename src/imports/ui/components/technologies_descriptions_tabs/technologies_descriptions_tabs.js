/**
 * context: {TechnologySchema}
 */

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { AutoForm } from 'meteor/aldeed:autoform';

import { Technologies } from '../../../api/technologies/technologies';
import { TechnologiesDescriptions } from '../../../api/technologies_descriptions/technologies_descriptions.js';

import { publish, remove, update } from '../../../api/technologies_descriptions/methods.js';
import './technologies_descriptions_tabs.html';

Template.technologiesDescriptionsTabs.onCreated(function() {
  this.isEditing = new ReactiveVar;
  this.currentId = new ReactiveVar;

  this.selectLastDescription = () => {
    if (this.data.descriptions().fetch() && this.data.descriptions().fetch().length > 0) {
      this.currentId.set(this.data.descriptions().fetch()[0]._id);
    }
  };

  let template = this;
  TechnologiesDescriptions.find({
    technologyId: this.data._id
  }).observe({
    changed: (newDocument) => {
      if (newDocument.createdBy === Meteor.userId()) {
        template.currentId.set(newDocument._id);
      }
    }
  });

  this.selectLastDescription();

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
    template.isEditing.set(false);
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
      const modifier = {
        $set: {
          shortText: template.$('textarea[name="shortText"]').val(),
          longText: template.$('textarea[name="longText"]').val()
        }
      };
      update.call({
        _id: description._id,
        modifier
      }, (updateErr, updateRes) => {
        if (updateErr) throw updateErr;
        publish.call({
          technologyId: description.technologyId,
          descriptionId: description._id
        }, (publishErr, publishRes) => {
          if (publishErr) throw publishErr;
          return toastr.success('The description was <b>saved</b> and <b>published</b>!', 'Success');
        });
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
      remove.call({
        descriptionId: template.currentId.get()
      }, (err, res) => {
        if (err) throw err;
        template.selectLastDescription();
        return toastr.success('The description was removed', 'Success');
      });
    });
  }
});

Template.technologiesDescriptionsTabs.helpers({
  isActive: (_id) => Template.instance().currentId.get() === _id,
  isEditing: () => Template.instance().isEditing.get(),
  isStatusPublished: (status) => status === 'published',
  currentDescription: () => TechnologiesDescriptions.findOne(Template.instance().currentId.get())
});
