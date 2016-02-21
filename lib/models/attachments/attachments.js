Attachments = new Mongo.Collection('attachments');


// =================================
// ======== Validations ============
// =================================

Attachments.validations = {

  expectedFileReference() {
    let from = this.field('from').value;
    let value = this.value;

    // Non web references needs a file reference.
    if (from === 'web') return true;
    return this.value !== undefined ? true : 'expectedFileReference';
  },

};

SimpleSchema.messages({ expectedFileReference: 'Expected file reference' });


// =================================
// ========== Schema ==============
// =================================

Schemas.Attachment = new SimpleSchema({
  name: {
    type: String,
    esDriver: true,
    logDriver: true
  },
  description: {
    type: String,
    esDriver: true,
    logDriver: true,
    optional: true,
    autoform: {
      afFieldInput: {
        type: 'textarea',
        rows: 8
      }
    }
  },
  from: {
    type: String,
    esDriver: true,
    allowedValues: ['web', 'remote_url', 'upload']
  },
  tags: {
    type: [String],
    optional: true
  },
  url: {
    type: String,
    optional: true,
    logDriver: true
  },
  imageUrl: {
    type: String,
    logDriver: true,
    esDriver: true,
    optional: true
  },

  file: {
    type: new SimpleSchema({
      _id: {
        type: String,
      },
      type: {
        type: String,
      },
      url: {
        type: String
      }
    }),
    optional: true,
    custom: Attachments.validations.expectedFileReference
  }

});


Attachments.attachSchema(Schemas.Attachment);
Attachments.attachBehaviour('timestampable');
Meteor.isServer && Attachments.esDriver(esClient, 'techdb', 'attachments');
