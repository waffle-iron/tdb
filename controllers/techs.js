"use strict"

var models = require("../models")
var generic = require("../libs/controller")

exports.index = generic.index({ wrapper: "tech" })
exports.create = generic.create({ wrapper: "tech", isAuthenticated: true })
exports.read = generic.read({ wrapper: "tech" })
exports.update = generic.update({ wrapper: "tech", isAuthenticated: true })
exports.delete = generic.delete({ wrapper: "tech", isAuthenticated: true })

function badRequest(res) {
  return res.status(400).send()
}

function updateTranslation (statusCode) {
  return function (req, res) {
    var techId = req.params.techId
    if (techId && techId.length !== 36) return badRequest(res)

    var lang = String(req.params.lang).toLowerCase()
    if (lang.length !== 2) return badRequest(res)

    var translation = req.body.tech
    if (!translation) return badRequest(res)

    models.Tech.createTranslation(techId, lang, translation)
      .then(function (translated) {
        return res.status(statusCode).send({ tech: translated })
      })
      .catch(function () { return res.status(500).send() })
  }
}

exports.createTranslation = updateTranslation(201)
exports.createTranslation.verb = "post"
exports.createTranslation.endpoint = "/:techId/translations/:lang"
exports.createTranslation.requiresAuthentication = true

exports.updateTranslation = updateTranslation(200)
exports.updateTranslation.verb = "put"
exports.updateTranslation.endpoint = "/:techId/translations/:lang"
exports.updateTranslation.requiresAuthentication = true
