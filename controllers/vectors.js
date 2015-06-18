"use strict"

var generic = require("../libs/controller")

exports.index = generic.index({ wrapper: "vector" })
exports.create = generic.create({ wrapper: "vector", isAuthenticated: true })
exports.read = generic.read({ wrapper: "vector" })
exports.update = generic.update({ wrapper: "vector", isAuthenticated: true })
exports.delete = generic.delete({ wrapper: "vector", isAuthenticated: true })
