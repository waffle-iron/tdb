//
//  Description
//
DescriptionSchema = new SimpleSchema({
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
  //  Revision Status: Draft, Review or Published.
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
  //  The long description. This could be embedded in HTML
  longText: {
    type: String,
    autoform: {
      type: 'summernote',
      class: 'editor' // optional
    }
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
    type: Date,
    autoform: {
      omit: true
    }
  }
});

//
//  Images
//
ImagesSchema = new SimpleSchema({
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

