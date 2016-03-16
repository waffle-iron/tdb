const TECH_ID_PAD_SIZE = 4;
const SHORT_TEXT_TRUNCATE_AT = 10;
let removeMarkdown = Meteor.isServer && Meteor.npmRequire('remove-markdown');

if (Meteor.isServer) {
  Technologies.before.insert(function(userId, doc) {
    doc.techId = s.lpad(AtomicCounter.increment('techId', 1), TECH_ID_PAD_SIZE, '0');


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
  });
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
