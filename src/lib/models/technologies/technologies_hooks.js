const TECH_ID_PAD_SIZE = 4;
const SHORT_TEXT_TRUNCATE_AT = 144;
let removeMarkdown = Meteor.isServer && Meteor.npmRequire('remove-markdown');

function generateShortDescription(userId, doc) {
  // create truncated shortText without markdown based on longText
  if (doc.description && Array.isArray(doc.description)) {
    doc.description = _.map(doc.description, (desc) => {
      if (!desc.shortText && desc.longText) {
        let noMarkdown = removeMarkdown(desc.longText) || '';
        desc.shortText = noMarkdown.substring(0, SHORT_TEXT_TRUNCATE_AT);
      }
      return desc;
    });
  }
}

function generateTechId(userId, doc) {
  doc.techId = s.lpad(AtomicCounter.increment('techId', 1), TECH_ID_PAD_SIZE, '0');
}

function generateCountersBeforeInsert(userId, doc) {
  doc.projectsCount = doc.projectsId && doc.projectsId.length || 0;
  doc.attachmentsCount = doc.attachmentsId && doc.attachmentsId.length || 0;
  doc.organizationsCount = doc.organizationsId && doc.organizationsId.length || 0;
}

function generateCountersAfterUpdate(userId, doc) {
  const currentDoc = this.transform(doc);
  const previousDoc = this.transform(this.previous);
  const query = { _id: doc._id };
  let modifier = { $set: {} };

  function setCountFor(property) {
    if (currentDoc[property]) {
      if (!previousDoc[property] || previousDoc[property].length !== currentDoc[property].length) {
        const entityName = property.replace('Id', '');
        const countingProperty = `${entityName}Count`;
        modifier.$set[countingProperty] = currentDoc[property].length;
      }
    }
  }

  setCountFor('attachmentsId');
  setCountFor('projectsId');
  setCountFor('organizationsId');

  if (!_.isEmpty(modifier.$set)) {
    Technologies.update(query, modifier);
  }
}

if (Meteor.isServer) {
  Technologies.before.insert(generateShortDescription);
  Technologies.before.insert(generateTechId);

  // Counters
  Technologies.before.insert(generateCountersBeforeInsert);
  Technologies.after.update(generateCountersAfterUpdate, { fetchPrevious: true });
}
