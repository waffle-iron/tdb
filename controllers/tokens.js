"use strict"

var _ = require("lodash")
var db = require("../libs/db")
var User = require("../models/user")
var Token = require("../models/token")

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

  db.cypherQueryAsync(
    "MATCH (user:User {email: {email} }) RETURN user LIMIT 1",
    {email: email}
  )
  .then(function (queryRes) { return queryRes.data })
  .then(function (users) { return users[0] || badCredentials(res) })
  .then(function (user) { return new User(user) })
  .then(function (user) {
    return user.testPassword(password) ? user : badCredentials(res)
  })
  .then(function (user) {
    var token = new Token()
    return token
      .setHashForUser(user)
      .then(function (token) { return token.save() })
      .then(function (token) {
        return db.insertRelationshipAsync(user.id, token.id, "has_token", {})
      })
      .then(function () {
        return {
          accessToken: token.get("hash"),
          user: user.id
        }
      })
  })
  .then(function (json) { return res.status(201).send(json) })
  .catch(function () { return res.status(500).send() })
}
