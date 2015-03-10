"use strict"

var db = require("../libs/db")
var models = require("../models")
var _ = require("lodash")

var REPEATED_EMAIL = /Node \d* already exists with label User and property "email"/

exports.create = function user$create (req, res) {
  var json = req.body.user
  if (!json) return res.status(400).send()

  var user, token;
  models.User.create(json)
    .then(function (createdUser) {
      user = createdUser
      return models.Token.create(user)
    })
    .then(function (createdToken) {
      token = createdToken
      return db.insertRelationshipAsync(user._id, token._id, "has_token", {})
    })
    .then(function () {
      user.tokens = [ token.hash ]
      return user
    })
    .then(function (user) {
      var userRes = _.pick(user, ["_id", "email", "tokens"])
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
