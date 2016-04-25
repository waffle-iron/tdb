import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { insert } from '../../../api/technologies_descriptions/methods.js';
import { DESCRIPTION_STATUS } from '../../../api/technologies_descriptions/schema.js';

import './technologies_descriptions_panel.html';

Template.technologiesDescriptionsPanel.events({
  'click [data-action="create-new-draft"]': function(event, template) {
    const newDraft = {
      technologyId: this._id,
      status: DESCRIPTION_STATUS.DRAFT
    };
    insert.call(newDraft);
  }
});
