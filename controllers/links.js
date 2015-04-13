"use strict"

var generic = require("../libs/controller")

exports.index = generic.index({ wrapper: "link" })
exports.create = generic.create({ wrapper: "link", isAuthenticated: true })
exports.read = generic.read({ wrapper: "link" })
exports.update = generic.update({ wrapper: "link", isAuthenticated: true })
exports.delete = generic.delete({ wrapper: "link", isAuthenticated: true })
