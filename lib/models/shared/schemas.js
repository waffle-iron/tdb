Schemas = {};

Schemas.Description = new SimpleSchema({
  userId: {
    type: String,
    autoform: {
      omit: true
    }
  },
  createdAt: {
    type: Date,
    autoform: {
      omit: true
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
  longText: {
    type: String,
    autoform: {
      type: 'summernote',
      class: 'editor'
    }
  },
  shortText: {
    type: String
  },
  applications: {
    type: [String]
  },
  benefits: {
    type: [String]
  }
});

Schemas.Url = new SimpleSchema({
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
    type: Date,
    autoform: {
      omit: true
    }
  }
});

Schemas.Image = new SimpleSchema({
  src: {
    type: String,
    label: 'Source'
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

Schemas.Impact = new SimpleSchema({
  userId: {
    type: String,
    autoform: {
      omit: true
    }
  },
  createdAt: {
    type: Date,
    autoform: {
      omit: true
    }
  },
  expertise: {
    type: Number
  },
  industries: {
    type: Object
  }
});

Schemas.Answer = new SimpleSchema({
  q01: {
    type: Number
  },
  q02: {
    type: Number
  },
  q03: {
    type: Number
  },
  q04: {
    type: Number
  },
  q05: {
    type: Number
  },
  q06: {
    type: Number
  },
  q07: {
    type: Number
  },
  q08: {
    type: Number
  },
  q09: {
    type: Number
  },
  q10: {
    type: Number
  }
});

Schemas.Scenario = new SimpleSchema({
    name: {
        type: String
    },
    description: {
        type: [Schemas.Description]
    },
    imgs: {
        type: [Schemas.Image]
    },
    technologiesId: {
        type: [String]
    },
    attachmentsId: {
        type: [String]
    }
});

Schemas.KeyPeople = new SimpleSchema({
  name: {
    type: String
  },
  role: {
    type: String
  }
});

Schemas.Content = new SimpleSchema({
  type: {
    type: String
  },
  url: {
    type: String
  }
});
