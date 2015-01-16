"use strict"

var models = require("../models")

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
      return res.status(500).send()
    })
}
