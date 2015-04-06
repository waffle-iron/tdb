"use strict"

var _ = require("lodash")
var models = require("../models")

function ok (res, json) { return res.status(200).send(json) }
function created (res, json) { return res.status(201).send(json) }
function noContent (res, json) { return res.status(204).send(json) }
function badRequest (res) { return res.status(400).send() }
function notFound (res) { return res.status(404).send() }
function notAcceptable (res) { return res.status(406).send() }
function internalServerError (res) { return res.status(500).send() }

function wrap (wrapper, data) {
  var wrapped = {}
  wrapper = _.isArray(data) ? wrapper + "s" : wrapper
  wrapped[wrapper] = data
  return wrapped
}

function sendNodeIfAny (res, wrapper) {
  return function (node) {
    if (!node) return notFound(res)
    return ok(res, wrap(wrapper, node))
  }
}

exports.create = function (opts) {
  var model = _.result(models, _.capitalize(opts.model || opts.wrapper))

  function generic$create (req, res) {
    var payload = _.result(req.body, opts.wrapper)
    if (!payload) return badRequest(res)

    model.create(payload)
      .then(function (node) { return created(res, wrap(opts.wrapper, node)) })
      .catch(_.wrap(res, internalServerError))
  }

  generic$create.requiresAuthentication = opts.isAuthenticated

  return generic$create
}

exports.index = function (opts) {
  var model = _.result(models, _.capitalize(opts.model || opts.wrapper))

  function generic$index (req, res) {
    var langToReturn = req.acceptsLanguages("en", "pt")
    if (!langToReturn) return notAcceptable(res)

    var options = _.pick(req.query, ["limit", "skip"])
    options.lang = langToReturn

    model.find({}, options)
      .then(function (results) {
        var json = wrap(opts.wrapper, results.nodes)
        if (_.keys(options).length > 0) {
          _.extend(json, { meta: { total: results.count }})
        }
        return ok(res, json)
      })
      .catch(_.wrap(res, internalServerError))
  }

  generic$index.requiresAuthentication = opts.isAuthenticated

  return generic$index
}

exports.read = function (opts) {
  var model = _.result(models, _.capitalize(opts.model || opts.wrapper))

  function generic$read (req, res) {
    var uuid = req.params.resourceId
    if (!uuid || uuid.length !== 36) return badRequest(res)

    var langToReturn = req.acceptsLanguages("en", "pt")
    if (!langToReturn) return notAcceptable(res)

    model.findById(langToReturn, uuid)
      .then(sendNodeIfAny(res, opts.wrapper))
      .catch(_.wrap(res, internalServerError))
  }

  generic$read.endpoint = "/:resourceId"
  generic$read.requiresAuthentication = opts.isAuthenticated

  return generic$read
}

exports.update = function (opts) {
  var model = _.result(models, _.capitalize(opts.model || opts.wrapper))

  function generic$update (req, res) {
    var uuid = req.params.resourceId
    if (!uuid || uuid.length !== 36) return badRequest(res)

    var payload = _.result(req.body, opts.wrapper)
    if (!payload) return badRequest(res)

    model.update(uuid, payload)
      .then(sendNodeIfAny(res, opts.wrapper))
      .catch(_.wrap(res, internalServerError))
  }

  generic$update.endpoint = "/:resourceId"
  generic$update.requiresAuthentication = opts.isAuthenticated

  return generic$update
}

exports.delete = function (opts) {
  var model = _.result(models, _.capitalize(opts.model || opts.wrapper))

  function generic$delete (req, res) {
    var uuid = req.params.resourceId
    if (!uuid || uuid.length !== 36) return badRequest(res)

    model.delete(uuid)
      .then(function () { return noContent(res) })
      .catch(_.wrap(res, internalServerError))
  }

  generic$delete.endpoint = "/:resourceId"
  generic$delete.requiresAuthentication = opts.isAuthenticated

  return generic$delete
}
