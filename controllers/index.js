"use strict"

var Promise = require("bluebird")
var _ = require("lodash")
var auth = require("../libs/auth")
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
        var id = SLASH + ":" + inflect.singularize(resource) + "Id"

        var router = express.Router()
        _.each(_.methods(controller), function (methodName) {
          if (_.startsWith(methodName, "_")) return

          var method = controller[methodName]
          var verb = method.verb || METHOD_VERBS[methodName]
          var endpoint = method.endpoint ||
                          ( _.contains(["index", "create"], methodName) ? SLASH
                                                                        : id )
          if (method.requiresAuthentication) {
            router[verb](endpoint, auth.isAuthenticated, method)
          } else {
            router[verb](endpoint, method)
          }
        })
        app.use(path.join(namespace, plural), router)
      })
    })
}
