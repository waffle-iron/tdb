"use strict"

var Promise = require("bluebird")
var _ = require("lodash")
var crypto = require("crypto")

var db = require(__dirname + "/../libs/db")

var ALGORITHM = "sha1"
var KEY = "PEbxnEl6pds6exDVfvl+FrPj/fQxgAEUUxgbeeqs7KM="

function Token (props) {
  this._id = undefined
  this.props = _.pick(props, _.keys(Token.schema))
}
Token.type = "Token"
Token.schema = {
  hash: String
}

Token.prototype.getLabels = function Token$getLabels () {
  return [ Token.type ]
}

Token.prototype.setHashForUser = function Token$createHash (user) {
  var _this = this
  return new Promise(function (resolve) {
    var hmac = crypto.createHmac(ALGORITHM, KEY)
    hmac.setEncoding("base64")
    hmac.end(user.props.email, "utf8", function () {
      _this.props.hash = hmac.read()
      resolve(_this)
    })
  })
}

Token.prototype.save = function Token$save () {
  var _this = this
  return db
    .insertNodeAsync(this.props, this.getLabels())
    .then(function (user) {
      _this._id = user._id
      return _this
    })
}

module.exports = Token
