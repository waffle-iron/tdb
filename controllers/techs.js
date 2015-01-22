"use strict"

var models = require("../models")

exports.create = function tech$create (req, res) {
  var json = req.body.tech
  if (!json) return res.status(400).send()

  models.Tech.saveAsync(json)
    .then(function (tech) {
      return res.status(201).send({ tech: tech })
    })
    .catch(function () {
      return res.status(500).send()
    })
}

exports.index = function tech$index (req, res) {
  models.Tech.findAllAsync()
    .then(function (techs) {
      return res.status(200).send({ techs: techs })
    })
    .catch(function () {
      return res.status(500).send()
    })
}

exports.read = function tech$read (req, res) {
  if (isNaN(req.params.techId)) return res.status(400).send()

  var id = Number(req.params.techId)

  models.Tech.readAsync(id)
    .then(function (model) {
      if (!model) return res.status(404).send()
      return res.status(200).send({ tech: model })
    })
    .catch(function (err) {
      console.log("Error!", err)
      return res.status(500).send()
    })
}
