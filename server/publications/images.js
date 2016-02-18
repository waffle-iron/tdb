Meteor.publish('images.single', function(imageId) {
  Meteor._sleepForMs(500);
  check(imageId, String);
  return Images.find({_id: imageId});
});
