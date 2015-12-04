Technologies = new Mongo.Collection('technologies');

Schemas.Technology = new SimpleSchema({
  name: {
    type: String
  },
  synonyms: {
    type: [String],
    optional: true,
    autoform: {
      type: 'tags'
    }
  },
  status: {
    type: String,
    allowedValues: ['Draft', 'Review', 'Published'],
    autoform: {
      type: 'selectize',
      options: [
        {
          label: 'Draft',
          value: 'Draft'
        },
        {
          label: 'Review',
          value: 'Review'
        },
        {
          label: 'Published',
          value: 'Published'
        }
      ]
    }
  },
  tags: {
    type: [String],
    autoform: {
      type: 'tags'
    }
  },
  description: {
    type: [Schemas.Description]
  },
  organizationId: {
    type: String,
    label: 'Organization',
    autoform: {
      type: 'selectize',
      options() {
        //  return Organizations.quickList();
      }
    }
  },
  images: {
    type: [Schemas.Image],
    optional: true
  },
  urls: {
    type: [Schemas.Url],
    optional: true
  },
  readiness: {
    type: [Schemas.Readiness],
    optional: true,
    autoform: {
      omit: true
    }
  },
  impact: {
    type: [Schemas.Impact],
    optional: true
  },
  attachmentsId: {
    type: [String],
    optional: true
  }
});

Technologies.attachSchema(Schemas.Technology);
Technologies.attachBehaviour('timestampable');

//                                       //
//                 EXTENSIONS            //
//                                       //
Technologies.quickList = function(query) {
  return this.find(query).map(function(c) {
    return {
      label: c.name,
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
