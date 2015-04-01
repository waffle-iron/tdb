"use strict"

var generic = require("../libs/controller")
var models = require("../models")

exports.index = generic.index({ wrapper: "startup" })
exports.create = generic.create({ wrapper: "startup", isAuthenticated: true })
exports.read = generic.read({ wrapper: "startup" })
exports.update = generic.update({ wrapper: "startup", isAuthenticated: true })
exports.delete = generic.delete({ wrapper: "startup", isAuthenticated: true })

function badRequest(res) {
  return res.status(400).send()
}

function updateTranslation (statusCode) {
  return function (req, res) {
    var startupId = req.params.startupId
    if (startupId && startupId.length !== 36) return badRequest(res)

    var lang = String(req.params.lang).toLowerCase()
    if (lang.length !== 2) return badRequest(res)

    var translation = req.body.startup
    if (!translation) return badRequest(res)

    models.Startup.createTranslation(startupId, lang, translation)
      .then(function (translated) {
        return res.status(statusCode).send({ startup: translated })
      })
      .catch(function () { return res.status(500).send() })
  }
}

exports.createTranslation = updateTranslation(201)
exports.createTranslation.verb = "post"
exports.createTranslation.endpoint = "/:startupId/translations/:lang"
exports.createTranslation.requiresAuthentication = true

exports.updateTranslation = updateTranslation(200)
exports.updateTranslation.verb = "put"
exports.updateTranslation.endpoint = "/:startupId/translations/:lang"
exports.updateTranslation.requiresAuthentication = true
