"use strict"

var _ = require("lodash")
var db = require("../libs/db")
var models = require("../models")

function badCredentials (res) {
  var errors = [
    { message: "The combination of email and password supplied does not exist"}
  ]
  return res.status(400).send({ errors: errors })
}

exports.create = function user$create (req, res) {
  var email = req.body.email
  var password = req.body.password
  var hasCredentials = !_.isEmpty(email) && !_.isEmpty(password)
  if (!hasCredentials) return res.status(400).send()

  models.User.findByEmail(email)
  .then(function (user) {
    if (!user || !models.User.checkPassword(user.hashedPassword, password)) {
      return badCredentials(res)
    }

    return models.Token.create(user)
      .then(function (token) {
        return db
          .insertRelationshipAsync(user._id, token._id, "has_token", {})
          .then(function () {
            return {
              accessToken: token.hash,
              user: user._id
            }
          })
      })
  })
  .then(function (json) { return res.status(201).send(json) })
  .catch(function () { return res.status(500).send() })
}
