"use strict"

var Model = require("../libs/model")
var Promise = require("bluebird")
var bcrypt = Promise.promisifyAll(require("bcrypt"))
var db = require("../libs/db")

module.exports = new Model(db, {
  type: "User",
  schema: {
    email: String,
    hashedPassword: String
  },
  instanceMethods: {
    setPassword: function (password) {
      return bcrypt
        .hashAsync(password, 10)
        .then(function (hash) {
          this.set("hashedPassword", hash)
          return this
        }.bind(this))
    },
    testPassword: function (password) {
      return bcrypt.compareSync(password, this.get("hashedPassword"))
    }
  }
})
