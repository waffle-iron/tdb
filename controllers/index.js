"use strict"

var Promise = require("bluebird")
var _ = require("lodash")
var express = require("express")
var fs = Promise.promisifyAll(require("fs"))
var inflect = require("i")()
var path = require("path")
var basename = path.basename(module.filename)

var SLASH = "/"

var METHOD_VERBS = {
  index: "get",
  create: "post",
  read: "get",
  update: "put",
  delete: "delete"
}

exports.initializeRoutes = function initializeRoutes (app, namespace) {
  return fs
    .readdirAsync(__dirname)
    .then(function filterForControllers (files) {
      return files.filter(function isVisibleAndNotThis (file) {
        return file.indexOf(".") !== 0 && file !== basename
      })
    })
    .then(function registerRoutes (files) {
      _.each(files, function (file) {
        var controller = require(path.join(__dirname, file))

        var resource = file.slice(0, -3)
        var plural = inflect.pluralize(resource)
        var id = SLASH + ":" + inflect.foreign_key(resource)

        var router = express.Router()
        var methods = controllerMethods(controller)
        _.each(methods, function (method) {
          var verb = METHOD_VERBS[method]
          var endpoint = (verb === "put" || verb === "delete") ? id : SLASH
          router[verb](endpoint, controller[method])
        })
        app.use(path.join(namespace, plural), router)
      })
    })
}

function controllerMethods (ctrl) {
  return _.filter(_.functions(ctrl), function (fn) { return fn[0] !== "_" })
}
