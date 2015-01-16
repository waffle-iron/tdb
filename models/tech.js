"use strict"

var _ = require("lodash")
var slug = require("slug")

function log10 (n) {
  return Math.log(n) / Math.LN10
}

function setReadiness (tech, cb) {
  var readinessTotal = _.range(10)
                    .map(function (n) { return tech["question" + n] })
                    .reduce(function (x, y) { return x * y })
  tech.readiness = log10(readinessTotal)
  cb(null, tech)
}

function setSlug (tech, cb) {
  tech.slug = slug(tech.name)
  cb(null, tech)
}

module.exports = {
  type: "Tech",
  schema: {
    name: { type: String, required: true, trim: true },
    slug: { type: String , trim: true },
    summary: { type: String , trim: true },
    description: { type: String , trim: true },
    thumbnail: { type: String , trim: true },
    picture: { type: String , trim: true },
    question0: { type: Number },
    question1: { type: Number },
    question2: { type: Number },
    question3: { type: Number },
    question4: { type: Number },
    question5: { type: Number },
    question6: { type: Number },
    question7: { type: Number },
    question8: { type: Number },
    question9: { type: Number },
    readiness: { type: Number }
  },
  useTimestamps: true,
  prepares: [ setReadiness, setSlug ],
  relationships: {
    tags: {
      model: "Tag",
      type: "has_tag",
      opts: { many: true }
    },
    category: {
      model: "Category",
      type: "belongs_to_category"
    },
    decks: {
      model: "Deck",
      type: "part_of_deck",
      opts: { many: true }
    }
  }
}
