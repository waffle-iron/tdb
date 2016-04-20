Template.technologiesEditDescriptions.helpers({
  isFirstItem: (index) => index === 0,
  isStatusPublished: (status) => status === 'published',
});

Template.technologiesEditDescriptions.events({
  'click [data-action="publish-description"]': function(event, template) {
  	Meteor.call('Technologies.methods.publishDescription', this._id, (err, res) => {
  		if (err) throw err;
  		console.log(res)
  	});
  }
});
