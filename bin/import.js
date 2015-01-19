"use strict"

var _ = require("lodash")
var Promise = require("bluebird")
var path = require("path")
var fs = require("fs")
var models = require("../models")

var dirString = path.dirname(fs.realpathSync(__dirname))
var data = require(path.join(dirString, process.argv[2]))
var categoriesJson = require(path.join(dirString, process.argv[3]))

function compactObject (obj) {
  _.each(obj, function (val, prop) {
    if (_.isNull(val) || _.isUndefined(val)) delete obj[prop]
  })
  return obj
}

var categories = _.reduce(categoriesJson, function (categories, cat) {
  categories[cat.id] = cat.name
  return categories
}, {})


var extractedTechs = _.map(data, function (importing) {
  var tech = {
    name: importing.name,
    summary: importing.short_desc,
    description: importing.long_desc,
    thumbnail: importing.photo.thumb.url,
    picture: importing.photo.url,
    question0: importing.question0,
    question1: importing.question1,
    question2: importing.question2,
    question3: importing.question3,
    question4: importing.question4,
    question5: importing.question5,
    question6: importing.question6,
    question7: importing.question7,
    question8: importing.question8,
    question9: importing.question9
  }
  var categoryName = importing.category_id && categories[importing.category_id]
  if (categoryName) {
    tech.category = {name: categoryName}
  }

  return compactObject(tech)
})

var validTechs = _.filter(extractedTechs, function (tech) { return tech.name })
var importations = _.map(validTechs, function (tech) {
  return models.Tech.saveAsync(tech)
})

Promise.all(importations).then(function () {
  console.log("Imported!")
})
