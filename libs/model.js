"use strict"

var _ = require("lodash")

function assignProperties (properties) {
  return function (type, prop) {
    var instanceValue = properties[prop]
    if (_.isUndefined(instanceValue)) return
    this.set(prop, type(instanceValue))
  }
}

function createModel (db, config) {
  var TYPE = config.type
  var SCHEMA = config.schema

  function Model (properties) {
    properties = properties || {}
    this.id = properties && properties._id
    this.properties = {}
    _.each(SCHEMA, assignProperties(properties), this)
  }
  Model.prototype.toNode = function () {
    var obj = _.clone(this.properties)
    obj.id = this.id
    return obj
  }
  Model.prototype.toJSON = function () {
    return JSON.stringify(this.toNode())
  }
  Model.prototype.save = function () {
    if (config.beforeSave) config.beforeSave.apply(this)
    return db
      .insertNodeAsync(this.toNode(), TYPE)
      .then(function (properties) {
        this.id = properties._id
        return this
      }.bind(this))
  }
  Model.prototype.update = function () {
    if (config.beforeSave) config.beforeSave.apply(this)
    return db
      .updateNodeAsync(this.id, this.toNode())
      .then(function () { return this }.bind(this))
  }
  Model.prototype.set = function (prop, value) {
    this.properties[prop] = value
    return this
  }
  Model.prototype.get = function (prop) {
    return this.properties[prop]
  }

  _.each(config.instanceMethods, function (fn, method) {
    Model.prototype[method] = fn
  })

  return Model
}

module.exports = createModel
