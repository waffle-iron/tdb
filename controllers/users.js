"use strict"

var User = require("../models2/user")
var Token = require("../models2/token")
var db = require("../libs/db")

var REPEATED_EMAIL = /Node \d* already exists with label User and property "email"/

exports.create = function user$create (req, res) {
  var json = req.body.user
  if (!json) return res.status(400).send()

  var user = new User(json)
  user.setPassword(json.password)
    .then(function (user) { return user.save() })
    .then(function (user) {
      var token = new Token()
      return token
        .setHashForUser(user)
        .then(function (token) { return token.save() })
        .then(function (token) {
          return db
            .insertRelationshipAsync(user.id, token.id, "has_token", {})
            .then(function () {
              user.tokens = [ token.get("hash") ]
              return user
            })
        })
    })
    .then(function (user) {
      var userRes = {
        _id: user.id,
        email: user.get("email"),
        tokens: user.tokens
      }
      return res.status(201).send({ user: userRes })
    })
    .catch(function (err) {
      if (err.message && err.message.match(REPEATED_EMAIL)) {
        return res.status(409).send({
          errors: {
            email: [ "The User email must be unique" ]
          }
        })
      }
      return res.status(500).send()
    })
}
