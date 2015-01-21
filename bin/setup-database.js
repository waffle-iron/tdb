"use strict"

var Promise = require("bluebird")
var _ = require("lodash")
var fs = Promise.promisifyAll(require("fs"))
var env = process.env.NODE_ENV || "development"
var config = require(__dirname + "/../config")[env]
var seraph = require("seraph")(config.db)

var createUnique = Promise.promisify(seraph.constraints.uniqueness.createIfNone)

function createUnique (label, field) {
  return new Promise(function (resolve, reject) {
    var cypher = "CREATE CONSTRAINT ON (n:{label}) ASSERT n.{field} IS UNIQUE"
    seraph.query(cypher, {label: label, field: field}, function (err, res) {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

function processQueue (queue) {
  var queueLength = queue.length
  return new Promise(function (resolve, reject) {
    function createForNextInQueue (queue) {
      var currUniq = queue.pop()
      if (!currUniq) return resolve(queueLength)
      createUnique(currUniq.label, currUniq.field).then(function () {
        return createForNextInQueue(queue)
      })
      .catch(reject)
    }
    createForNextInQueue(queue)
  })
}


fs.readdirAsync(__dirname + "/../models")
  .then(function filterForModels (files) {
    return files.filter(function (file) {
      return file.indexOf(".") !== 0 && file !== "index.js"
    })
  })
  .then(function importDeclarations (files) {
    return files.map(function (file) {
      return require(__dirname + "/../models/" + file)
    })
  })
  .then(function setConstraints (declarations) {
    var modelUniqueFields = []
    _.each(declarations, function (declaration) {
      _.each(declaration.uniqueFields, function (noConflict, field) {
        modelUniqueFields.push({ label: declaration.type, field: field })
      })
    })
    return processQueue(modelUniqueFields)
  })
  .then(function done (n) {
    console.log("Just set %s uniques", n)
  })
  .catch(console.log.bind(console))
