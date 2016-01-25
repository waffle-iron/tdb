Template.log.helpers({
  selector() {
    return {
      collection: 'organizations',
      createdAt: {$gt: new Date(2016, 0, 1)}
    };
  }
});
