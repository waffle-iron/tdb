"use strict"

var NAMESPACE = "/api/v2"

module.exports = function url() {
  var parts = [].slice.apply(arguments)
  return [NAMESPACE].concat(parts).join("/")
}
