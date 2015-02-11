"use strict"

var Promise = require("bluebird")
var Model = require("../libs/model")
var crypto = require("crypto")
var db = require("../libs/db")

var ALGORITHM = "sha1"
var KEY = "PEbxnEl6pds6exDVfvl+FrPj/fQxgAEUUxgbeeqs7KM="

module.exports = new Model(db, {
  type: "Token",
  schema: {
    hash: String
  },
  instanceMethods: {
    setHashForUser: function (user) {
      return new Promise(function (resolve) {
        var hmac = crypto.createHmac(ALGORITHM, KEY)
        hmac.setEncoding("base64")
        hmac.end(user.get("email"), "utf8", function () {
          this.set("hash", hmac.read())
          resolve(this)
        }.bind(this))
      }.bind(this))
    }
  }
})
