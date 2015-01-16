"use strict"

var crypto = require("crypto")

var ALGORITHM = "sha1"
var KEY = "PEbxnEl6pds6exDVfvl+FrPj/fQxgAEUUxgbeeqs7KM="

function setHash (token, cb) {
  var owner = token.owner
  delete token.owner

  var hmac = crypto.createHmac(ALGORITHM, KEY)
  hmac.setEncoding("base64")
  hmac.end(owner, "utf8", function () {
    var hash = hmac.read()
    token.hash = hash
    cb(null, token)
  })
}

module.exports = {
  type: "Token",
  schema: {
    hash: String
  },
  useTimestamps: true,
  prepares: [ setHash ]
}
