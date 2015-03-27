"use strict"

var models = require("../models")
var _ = require("lodash")

exports.create = function tech$create (req, res) {
  var json = req.body.tech
  if (!json) return res.status(400).send()

  models.Tech.create(json)
    .then(function (tech) {
      return res.status(201).send({ tech: tech })
    })
    .catch(function () { return res.status(500).send() })
}
exports.create.requiresAuthentication = true

exports.index = function tech$index (req, res) {
  var options = _.pick(req.query, ["limit", "skip"])
  models.Tech.find({}, options)
    .then(function (results) {
      var json = { techs: results.nodes }
      if (_.keys(options).length > 0) {
        _.extend(json, { meta: { total: results.count }})
      }
      return res.status(200).send(json)
    })
    .catch(function (err) {
      console.log(err)
      return res.status(500).send()
    })
}

exports.read = function tech$read (req, res) {
  var techId = req.params.techId
  if (techId && techId.length !== 36) return res.status(400).send()

  models.Tech.findById(techId)
    .then(function (model) {
      if (!model) return res.status(404).send()
      return res.status(200).send({ tech: model })
    })
    .catch(function (err) {
      console.log("Error!", err)
      return res.status(500).send()
    })
}

exports.update = function tech$read (req, res) {
  var techId = req.params.techId
  if (techId && techId.length !== 36) return res.status(400).send()
  if (!req.body.tech) return res.status(400).send()

  models.Tech.update(techId, req.body.tech)
    .then(function (tech) {
      if (!tech) return res.status(404).send()
      return res.status(200).send({ tech: tech })
    })
    .catch(function (err) {
      console.log("Error!", err)
      return res.status(500).send()
    })
}
exports.update.requiresAuthentication = true

exports.delete = function tech$read (req, res) {
  var techId = req.params.techId
  if (techId && techId.length !== 36) return res.status(400).send()

  models.Tech.delete(techId)
    .then(function () {
      return res.status(204).send()
    })
    .catch(function (err) {
      console.log("Error!", err)
      return res.status(500).send()
    })
}
exports.delete.requiresAuthentication = true
