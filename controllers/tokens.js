"use strict"

var _ = require("lodash")
var Promise = require("bluebird")
var models = require("../models")
var testPassword = require("../libs/password").testPassword

function badCredentials () {
  var errors = [
    { message: "The combination of email and password supplied does not exist"}
  ]
  return Promise.reject({ status: 400, errors: errors })
}

exports.create = function user$create (req, res) {
  var email = req.body.email
  var password = req.body.password
  var hasCredentials = !_.isEmpty(email) && !_.isEmpty(password)
  if (!hasCredentials) return res.status(400).send()

  models.User.whereAsync({ email: email }, { limit: 1 })
    .then(function checkIfUserExists (users) {
      var user = users[0]
      if (user) return user
      return badCredentials()
    })
    .then(function validatePassword (user) {
      if (testPassword(user.hashedPassword, password)) return user
      return badCredentials()

    })
    .then(function createToken (user) {
      return Promise.props({
        user: user,
        token:models.Token.saveAsync({ owner: user.email })
      })
    })
    .then(function respond (data) {
      var json = {
        accessToken: data.token.hash,
        user: data.user.id
      }
      return res.status(201).send(json)
    })
    .catch(function handleErrors (err) {
      if (err.status && err.errors) {
        return res.status(err.status).send({ errors: err.errors })
      }

      return res.status(500).send()
    })
}
