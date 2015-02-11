"use strict"

var _ = require("lodash")
var slug = require("slug")
var Model = require("../libs/model")
var db = require("../libs/db")

function log10 (n) {
  return Math.log(n) / Math.LN10
}

module.exports = new Model(db, {
  type: "Tech",
  schema: {
    name: String,
    slug: String,
    summary: String,
    description: String,
    thumbnail: String,
    picture: String,
    question0: Number,
    question1: Number,
    question2: Number,
    question3: Number,
    question4: Number,
    question5: Number,
    question6: Number,
    question7: Number,
    question8: Number,
    question9: Number,
    readiness: Number
  },
  beforeSave: function () {
    var readinessBasis = _.range(10)
                  .map(function (n) { return this.get("question" + n) }, this)
                  .reduce(function (x, y) { return x * y })
    var readiness = log10(readinessBasis)
    this.set("readiness", readiness)
    this.set("slug", slug(this.get("name")).toLowerCase())
  }
})
