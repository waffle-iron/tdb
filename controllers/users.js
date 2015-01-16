"use strict"

var models = require("../models")

var REPEATED_EMAIL = /Node \d* already exists with label User and property "email"/

exports.create = function user$create (req, res) {
  var json = req.body.user
  if (!json) return res.status(400).send()

  json.tokens = [
    { owner: json.email }
  ]
  models.User.saveAsync(json)
    .then(function (user) {
      return res.status(201).send({ user: user })
    })
    .catch(function (err) {
      if (err.neo4jError.message && err.neo4jError.message.match(REPEATED_EMAIL)) {
        return res.status(409).send({
          errors: {
            email: [ "The User email must be unique" ]
          }
        })
      }
      return res.status(500).send()
    })
}
