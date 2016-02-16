Template.attachmentsAddFromWebsite.events({
  'input input[name="imageUrl"]': function(e, t) {
    let attachment = t.attachment.get();
    attachment.imageUrl = e.target.value;
    t.attachment.set(attachment);
  },
});

Template.attachmentsAddFromWebsite.helpers({
  attachment() {
    return Template.instance().attachment.get();
  },
  onFetchMetadataSuccess() {
    let template = Template.instance();
    return function(res) {
      template.attachment.set({
        name: res.title,
        description: res.description,
        imageUrl: res.image,
        url: res.url
      });
    }
  }
});

Template.attachmentsAddFromWebsite.onCreated(function() {
  this.attachment = new ReactiveVar;
});
