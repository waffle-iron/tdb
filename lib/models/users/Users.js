//                                       //
//                 SCHEMAS               //
//                                       //

Schemas.ContactInfo = new SimpleSchema({
  twitter: {
    type: String,
    optional: true
  },
  slack: {
    type: String,
    optional: true
  },
  github: {
    type: String,
    optional: true
  },
  skype: {
    type: String,
    optional: true
  },
  phone: {
    type: String,
    optional: true
  },
  mobile: {
    type: String,
    optional: true
  }
});


//
// Profile
//
Schemas.Profile = new SimpleSchema({
  firstName: {
    type: String,
    optional: true
  },
  lastName: {
    type: String,
    optional: true
  },
  fullName: {
    type: String,
    optional: true,
    autoValue: function() {
      let firstName = this.field('profile.firstName');
      let lastName = this.field('profile.lastName');
      if (firstName.isSet && lastName.isSet) {
        return firstName.value + ' ' + lastName.value;
      }
    },
    autoform: {
      omit: true
    },
  },
  birth: {
    type: Date,
    optional: true,
    autoform: {
      type: 'bootstrap-datepicker',
      datePickerOptions: {
        format: 'yyyy/mm/dd',
        language: 'en-US'
      }
    }
  },
  gender: {
    type: String,
    optional: true,
    allowedValues: ['male', 'female'],
    autoform: {
      label: 'Gender',
      type: 'select-radio-inline',
      options: [{
        value: 'male',
        label: 'Male'
      }, {
        value: 'female',
        label: 'Female'
      }]
    }
  },
  affiliation: {
    type: String,
    optional: true
  },
  address: {
    type: String,
    optional: true,
    autoform: {
      label: 'Address',
    }
  },
  about: {
    type: String,
    optional: true,
    autoform: {
      type: 'textarea',
      rows: 6
    }
  },
  imageId: {
    type: String,
    optional: true
  },
  country: {
    type: String,
    optional: true,
    autoform: {
      type: 'countryFlags'
    }
  },
  contactInfo: {
    type: Schemas.ContactInfo,
    optional: true,
    blackbox: true
  },
  bio: {
    type: String,
    optional: true,
    autoform: {
      rows: 6
    }
  }
});

//
// Invite
//
InviteSchema = new SimpleSchema({
  email: {
    type: String,
    autoform: {
      label: 'Email'
    }
  },
  roles: {
    type: String,
    allowedValues: ['admin', 'editor', 'viewer'],
    autoform: {
      label: 'Role',
      firstOption: 'Select a role',
      type: 'selectize',
      options: [{
        value: 'admin',
        label: 'Admin'
      },
       {
        value: 'editor',
        label: 'Editor'
      }, {
        value: 'viewer',
        label: 'Viewer'
      }, ]
    }
  }
});


//
// Users
//
Schemas.Users = new SimpleSchema({
  username: {
    type: String,
    optional: true
  },
  emails: {
    type: [Object],
    autoform: {
      omit: true
    },
  },
  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  'emails.$.verified': {
    type: Boolean
  },
  profile: {
    type: Schemas.Profile,
    optional: true,
    blackbox: true,
    autoform: {
      omit: true
    }
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true,
    autoform: {
      omit: true
    }
  },
  roles: {
    type: Object,
    optional: true,
    blackbox: true
  },
  status: {
    type: Object,
    blackbox: true,
    optional: true
  },
  active: {
    type: Boolean,
    autoValue() {
      return false;
    }
  },
  projectsId: {
    type: [String],
    optional: true
  }
});

Meteor.users.attachSchema(Schemas.Users);
Meteor.users.attachBehaviour('timestampable');

//                                       //
//                 EXTENSIONS            //
//                                       //
Meteor.users.quickList = function() {
  return this.find().map(function(c) {
    let nome = c.profile.nomeCompleto ? c.profile.nomeCompleto : c.emails[0].address;
    return {
      label: nome,
      value: c._id
    };
  });
};

//                                       //
//                 HELPERS               //
//                                       //
Meteor.users.helpers({
  role() {
      let roles = Roles.getRolesForUser(this._id);
      return roles[0];
    },
    link() {
      return FlowRouter.path('usersEntry', {
        id: this._id
      });
    },
    identification(priority = ['fullName', 'username', 'email']) {
      let foundIdentification = 'unknown';
      _.some(priority, (p) => {
        switch (p) {
          case 'fullName':
            if (this.profile && this.profile.fullName) {
              foundIdentification = this.profile.fullName;
              return true;
            }
            return false;
          case 'username':
            if (this.username) {
              foundIdentification = this.username;
              return true;
            }
            return false;
          case 'email':
            if (this.emails && this.emails.length) {
              foundIdentification = this.emails[0].address;
              return true;
            }
            return false;
          default:
            return true;
        }
      });
      return foundIdentification;
    },
    profileImage() {
      if (this.profile && this.profile.imageId) {
        return Images.findOne({
          _id: this.profile.imageId
        });
      }
    },
    projects() {
      return this.projectsId && Projects.find({
        _id: {$in: this.projectsId}
      });
    }
});

//                                       //
//                 DATATABLE             //
//                                       //
TabularTables.Users = new Tabular.Table({
  name: 'UsersList',
  pub: 'tabular_UsersList',
  collection: Meteor.users,
  sub: new SubsManager(),
  autoWidth: false,
  responsive: true,
  stateSave: true,
  extraFields: ['_id', 'profile', 'emails'],
  columns: [{
    title: 'Email',
    data: 'emails.0.address',
    tmpl: Meteor.isClient && Template.nameLink,
    tmplContext(rowData) {
      return {
        name: rowData.emails && rowData.emails[0].address,
        link: rowData.link()
      };
    },
    width: '20%',
    sType: 'html'
  }, {
    title: 'Full Name',
    data: 'profile.fullName',
    width: '60%'
  }, {
    title: 'Role',
    data: 'role()'
  }, {
    title: 'Actions',
    tmpl: Meteor.isClient && Template.usersActions,
    width: '10%'
  }],
  bLengthChange: false,
  bPaginate: true,
  type: 'html'
});
