// function generateCountersBeforeInsert(userId, doc) {
//   doc.projectsCount = doc.projectsId && doc.projectsId.length || 0;
//   doc.attachmentsCount = doc.attachmentsId && doc.attachmentsId.length || 0;
//   doc.technologiesCount = doc.technologiesId && doc.technologiesId.length || 0;
// }

// function generateCountersAfterUpdate(userId, doc) {
//   Organizations.update({ _id: doc._id }, {
//     $set: {
//       projectsCount: doc.projectsId && doc.projectsId.length || 0,
//       attachmentsCount: doc.attachmentsId && doc.attachmentsId.length || 0,
//       technologiesCount: doc.technologiesId && doc.technologiesId.length || 0,
//     }
//   });
// }

// if (Meteor.isServer) {
//   Organizations.before.insert(generateCountersAfterInsert);
//   Organizations.after.update(generateCountersAfterUpdate);
// }
