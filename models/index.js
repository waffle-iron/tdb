"use strict"

var _ = require("lodash")
var Promise = require("bluebird")
var fs = require("fs")
var path = require("path")
var basename = path.basename(module.filename)
var env = process.env.NODE_ENV || "development"
var config = require(__dirname + "/../config")[env]
var seraph = require("seraph")(config.db)
var seraphModel = require("seraph-model")

var db = {}

var events = ["prepare", "validate", "beforeSave", "afterSave"]

function initializeModel (file) {
  var declaration = require(path.join(__dirname, file))
  var model = seraphModel(seraph, declaration.type)

  _.each(events, function (event) {
    var prop = event + "s"
    _.each(declaration[prop], function (cb) {
      model.on(event, cb)
    })
  })

  _.each(declaration.computedFields, function (cb, name) {
    model.addComputedField(name, cb)
  })

  model.schema = declaration.schema

  if (declaration.useTimestamps) model.useTimestamps()

  db[declaration.type] = model
}

function setupCompositions (file) {
  var declaration = require(path.join(__dirname, file))
  var model = db[declaration.type]

  _.each(declaration.relationships, function (params, name) {
    var relatedModel = db[params.model]
    model.compose(relatedModel, name, params.type, params.opts)
  })
}

var modelFiles = fs.readdirSync(__dirname)
  .filter(function (file) {
    return file.indexOf(".") !== 0 && file !== basename
  })

modelFiles.forEach(initializeModel)
modelFiles.forEach(setupCompositions)

_.each(db, function (model) {
  Promise.promisifyAll(model)
})

db.seraph = seraph

module.exports = db
