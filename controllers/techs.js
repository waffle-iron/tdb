"use strict"

var models = require("../models")
var _ = require("lodash")

function badRequest(res) {
  return res.status(400).send()
}

exports.create = function tech$create (req, res) {
  var json = req.body.tech
  if (!json) return badRequest(res)

  models.Tech.create(json)
    .then(function (tech) {
      return res.status(201).send({ tech: tech })
    })
    .catch(function () { return res.status(500).send() })
}
exports.create.requiresAuthentication = true

exports.createTranslation = function tech$translation$create (req, res) {
  var techId = req.params.techId
  if (techId && techId.length !== 36) return badRequest(res)

  var lang = String(req.params.lang).toLowerCase()
  if (lang.length !== 2) return badRequest(res)

  var translation = req.body.tech
  if (!translation) return badRequest(res)

  models.Tech.createTranslation(techId, lang, translation)
    .then(function (translated) {
      return res.status(201).send({ tech: translated })
    })
    .catch(function () { return res.status(500).send() })
}
exports.createTranslation.verb = "post"
exports.createTranslation.endpoint = "/:techId/translations/:lang"
exports.createTranslation.requiresAuthentication = true

exports.index = function tech$index (req, res) {
  var langToReturn = req.acceptsLanguages("en", "pt")
  if (!langToReturn) return res.status(406).send()

  var options = _.pick(req.query, ["limit", "skip"])
  models.Tech.find({}, options)
    .then(function translate (results) {
      results.nodes = _.map(results.nodes, function (node) {
        return models.Tech.filterForLanguage(langToReturn, node)
      })

      return results
    })
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
  if (techId && techId.length !== 36) return badRequest(res)

  var langToReturn = req.acceptsLanguages("en", "pt")
  if (!langToReturn) return res.status(406).send()

  models.Tech.findById(langToReturn, techId)
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
  if (techId && techId.length !== 36) return badRequest(res)
  if (!req.body.tech) return badRequest(res)

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
  if (techId && techId.length !== 36) return badRequest(res)

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
