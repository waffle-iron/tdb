const TECH_ID_PAD_SIZE = 4;
if (Meteor.isServer) {
  Technologies.before.insert(function(userId, doc) {
    doc.techId = s.lpad(AtomicCounter.increment('techId', 1), TECH_ID_PAD_SIZE, '0');
  });
}
