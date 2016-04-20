Template.technologiesEditDescriptions.helpers({
  isFirstItem: (index) => index === 0,
  isStatusPublished: (status) => {return status === 'published';},
  fieldName: (_id, name) => {
  	let techData = Template.instance().data;
  	let itemIndex = _.indexOf(_.pluck(techData.description, '_id'), _id);
  	return `description.${itemIndex}.${name}`;
  }
});
