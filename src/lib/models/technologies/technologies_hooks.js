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
  doc.projectsCount = doc.projectsId && doc.projectsId.length || 0;
  doc.attachmentsCount = doc.attachmentsId && doc.attachmentsId.length || 0;
  doc.organizationsCount = doc.organizationsId && doc.organizationsId.length || 0;
}

if (Meteor.isServer) {
  Technologies.before.insert(generateShortDescription);
  Technologies.before.insert(generateTechId);

  // Counters
  Technologies.before.insert(generateCountersBeforeInsert);
  Technologies.before.update(generateCountersAfterUpdate);
}

/*
    autoValue() {
      let longText = this.field('name');
      console.log(longText.value);
      if (longText.isSet) {
        return Meteor.isServer && removeMarkdown(longText.value);
      }
      return '';
    }*/
