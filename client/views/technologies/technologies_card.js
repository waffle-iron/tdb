Template.technologiesCard.onCreated(function() {
  this.subscribe('technologieCard', this.data.techId);
});

Template.technologiesCard.helpers({
  technology() {
    let techId = Template.instance().data.techId;
    return Technologies.findOne(techId);
  }
});
