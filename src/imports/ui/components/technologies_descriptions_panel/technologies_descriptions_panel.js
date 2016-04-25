import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { insert } from '../../../api/technologies_descriptions/methods.js';
import { DESCRIPTION_STATUS } from '../../../api/technologies_descriptions/schema.js';

import './technologies_descriptions_panel.html';

Template.technologiesDescriptionsPanel.events({
  'click [data-action="create-new-draft"]': function(event, template) {
    insert.call({
      technologyId: this._id,
      status: DESCRIPTION_STATUS.DRAFT
    }, (err, res) => {
    	if (err) return toatr.error(err.error);
    	return toastr.success('A new draft was created', 'Success');
    });
  }
});
