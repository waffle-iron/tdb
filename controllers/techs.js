"use strict"

var Tech = require("../models/tech")
var db = require("../libs/db")

exports.create = function tech$create (req, res) {
  var json = req.body.tech
  if (!json) return res.status(400).send()

  var tech = new Tech(json)
  tech.save()
    .then(function (tech) {
      var json = tech.toNode()
      json._id = json.id
      return res.status(201).send({ tech: json })
    })
    .catch(function () {
      return res.status(500).send()
    })
}
exports.create.requiresAuthentication = true

exports.index = function tech$index (req, res) {
  db.readNodesWithLabelAsync("Tech")
    .then(function (techs) {
      return res.status(200).send({ techs: techs })
    })
    .catch(function (err) {
      console.log(err)
      return res.status(500).send()
    })
}

exports.read = function tech$read (req, res) {
  if (isNaN(req.params.techId)) return res.status(400).send()

  var id = Number(req.params.techId)
  db.readNodeAsync(id)
    .then(function (model) {
      if (!model) return res.status(404).send()
      return res.status(200).send({ tech: model })
    })
    .catch(function (err) {
      console.log("Error!", err)
      return res.status(500).send()
    })
}

exports.update = function tech$read (req, res) {
  if (isNaN(req.params.techId)) return res.status(400).send()
  if (!req.body.tech) return res.status(400).send()

  var techProps = req.body.tech
  techProps._id = Number(req.params.techId)
  var tech = new Tech(techProps)

  tech.update()
    .then(function (model) {
      if (!model) return res.status(404).send()
      var json = model.toNode()
      json._id = model.id
      return res.status(200).send({ tech: json })
    })
    .catch(function (err) {
      console.log("Error!", err)
      return res.status(500).send()
    })
}
exports.update.requiresAuthentication = true

exports.delete = function tech$read (req, res) {
  if (isNaN(req.params.techId)) return res.status(400).send()

  var id = Number(req.params.techId)
  db.deleteNodeAsync(id)
    .then(function () {
      return res.status(204).send()
    })
    .catch(function (err) {
      console.log("Error!", err)
      return res.status(500).send()
    })
}
exports.delete.requiresAuthentication = true
