Technologies = new Mongo.Collection('Technologies');
//                                       //
//                 SCHEMA                //
//                                       //
//
// ANSWERS
//
AnswersSchema  = new SimpleSchema({
  //  Has it proven scientifically viable?
  q01: {
    type: Number
  },
  //  Has it proven financially viable?
  q02: {
    type: Number
  },
  //  Is the technology functioning?
  q03: {
    type: Number
  },
  //  Has it proven more efficient than the technology it replaces?
  q04: {
    type: Number
  },
  //  Has it been invested in?
  q05: {
    type: Number
  },
  //  Has it been featured in the media?
  q06: {
    type: Number
  },
  //  Does it solve a problem?
  q07: {
    type: Number
  },
  //  Is there competition in the market?
  q08: {
    type: Number
  },
  //  Technological dependencies
  q09: {
    type: Number
  },
  // Can it be easily explained?
  q10: {
    type: Number
  }
});

//
// READINESS
//
ReadinessSchema = new SimpleSchema({
  userId: {
    type: String
  },
  createdAt: {
    type: Date
  },
  //  User's level of knowledge of this technology
  expertise: {
    type: Number
  },
  answers: {
    type: AnswersSchema
  }
});

//
// IMPACT
//
ImpactSchema = new SimpleSchema({
  userId: {
    type: String
  },
  createdAt: {
    type: Date
  },
  // What is this person's level of knowledge of this technology
  expertise: {
    type: Number
  },
  // We'll only store positive answers
  industries: {
    type: Object
  }
});

//
// URLs
//

UrlsSchema = new SimpleSchema({
  url: {
    type: String
  },
  description: {
    type: String
  },
  type: {
    type: String
  },
  createdAt: {
    type: Date
  }
});

//
//  Images
//
ImagesSchema = new SimpleSchema({
  src: {
    type: String
  },
  description: {
    type: String
  },
  height: {
    type: Number
  },
  width: {
    type: Number
  }
});

//
//  Description
//
DescriptionSchema = new SimpleSchema({
  userId: {
    type: String
  },
  createdAt: {
    type: Date
  },
  //  Revision Status: Draft, Review or Published.
  status: {
    type: String,
    allowedValues: ['Draft', 'Review', 'Published']
  },
  //  The long description. This could be embedded in HTML
  longText: {
    type: String
  },
  //  Short description, not richtext
  shortText: {
    type: String
  },
  //  Quais as aplicações da tecnologia
  applications: {
    type: [String]
  },
  //  A quem beneficia?
  benefits: {
    type: [String]
  }
});

//
// Technologies
//
Technologies.Schema = new SimpleSchema({
  //  Name of the given technology
  name: {
    type: String
  },
  //  Synonyms. They have a lower rank, but could also be searched by
  synonyms: {
    type: [String]
  },
  //  Technology Status: Draft, Review or Published.
  status: {
    type: String,
    allowedValues: ['Draft', 'Review', 'Published']
  },
  //  Tags for searching and correlation
  tags: {
    type: [String]
  },
  //   Description with Versioning support
  description: {
    type: [DescriptionSchema]
  },
  organizationId: {
    type: String
  },
  //   Images. We oftenly have several images for the same technology.
  //   Some with different sizes for different purposes (print, web, etc…)
  images: {
    type: [ImagesSchema]
  },
  //  Block of URLs.
  urls: {
    type: [UrlsSchema]
  },
  //  Readiness model
  readiness: {
    type: [ReadinessSchema]
  },
  //  Impact Model – Disruptive potential [1–5] per industry:
  impact: {
    type: [ImpactSchema]
  },
  attachmentsId: {
    type: [String]
  }
});

Technologies.attachSchema(Technologies.Schema);
Technologies.attachBehaviour('timestampable');

//                                       //
//                 EXTENSIONS            //
//                                       //
Technologies.quickList = function(query) {
  return this.find(query).map(function(c) {
    return {
      label: c.nome,
      value: c._id
    };
  });
};

//                                       //
//                 SECURITY              //
//                                       //

if (Meteor.isServer) {
  Technologies.allow({
    insert: function() {
      return true;
    },
    update: function() {
      return true;
    },
    remove: function() {
      return true;
    }
  });
}

//                                       //
//                 HOOKS                 //
//                                       //

//                                       //
//                 HELPERS               //
//                                       //

Technologies.helpers({
  link: function() {
    return FlowRouter.path('technologies.view', {
      id: this._id
    });
  },
});


//                                       //
//                 DATATABLE             //
//                                       //

TabularTables.Technologies = new Tabular.Table({
  name: 'TechnologiesList',
  collection: Technologies,
  sub: new SubsManager(),
  pub: 'tabularTechnologiesList',
  autoWidth: false,
  responsive: true,
  stateSave: true,
  extraFields: ['_id'],
  columns: [{
    title: 'Name',
    data: 'name',
    width: '90%'
  }, {
    title: 'Actions',
    tmpl: Meteor.isClient && Template.technologiesActions,
    width: '10%'
  }],
  bPaginate: true
});
