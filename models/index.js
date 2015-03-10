"use strict"

var Promise = require("bluebird")
var _ = require("lodash")
var bcrypt = Promise.promisifyAll(require("bcrypt"))
var crypto = require("crypto")
var db = require("../libs/db")
var slug = require("slug")

function assemblyNode (node, field, fieldname) {
  /* jshint validthis: true */
  var raw = this[fieldname]
  node[fieldname] = _.isUndefined(raw) ? raw : field.type(raw)
  return node
}

function createHmac (string) {
  var ALGORITHM = "sha1"
  var KEY = "PEbxnEl6pds6exDVfvl+FrPj/fQxgAEUUxgbeeqs7KM="
  return new Promise(function (resolve) {
    var hmac = crypto.createHmac(ALGORITHM, KEY)
    hmac.setEncoding("base64")
    hmac.end(string, "utf8", function () {
      resolve(hmac.read())
    })
  })
}

exports.User = {
    schema: {
        email: { type: String, required: true },
        hashedPassword: { type: String, required: true }
    },
    create: function (user) {
        return bcrypt
          .hashAsync(user.password, 10)
          .then(function (hash) {
            var node = _.reduce(this.schema, assemblyNode, {}, user)
            node.hashedPassword = hash
            return db.insertNodeAsync(node, "User")
          }.bind(this))
    },
    findByEmail: function (email) {
      return db
        .cypherQueryAsync(
          "MATCH (user:User {email: {email} }) RETURN user LIMIT 1",
          {email: email}
        )
        .then(function (res) {
          return res.data[0];
        })
    },
    checkPassword: function (hash, password) {
      return bcrypt.compareSync(password, hash)
    }
}

exports.Token = {
  schema: {
    hash: { type: String }
  },
  create: function (user) {
    return createHmac(user.email)
      .then(function (hash) {
        return db.insertNodeAsync({ hash: hash }, "Token")
      })
  }
}

function calculateReadiness (tech) {
  var values = _.range(10)
                .map(function (n) { return tech["question" + n]})
  var multiplied = _.reduce(values, function (x, y) { return x * y })
  return Math.log(multiplied) / Math.LN10
}

exports.Tech = {
  schema: {
    name: { type: String, required: true },
    slug: { type: String, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    impactBanking: { type: Number, required: true },
    impactEducation: { type: Number, required: true },
    impactEntertainment: { type: Number, required: true },
    impactFood: { type: Number, required: true },
    impactHousing: { type: Number, required: true },
    impactMedia: { type: Number, required: true },
    impactMobile: { type: Number, required: true },
    impactPolicy: { type: Number, required: true },
    impactRetail: { type: Number, required: true },
    impactRobotics: { type: Number, required: true },
    impactSustainability: { type: Number, required: true },
    impactTransportation: { type: Number, required: true },
    impactTravel: { type: Number, required: true },
    impactWellbeing: { type: Number, required: true },
    question0: { type: Number, required: true },
    question1: { type: Number, required: true },
    question2: { type: Number, required: true },
    question3: { type: Number, required: true },
    question4: { type: Number, required: true },
    question5: { type: Number, required: true },
    question6: { type: Number, required: true },
    question7: { type: Number, required: true },
    question8: { type: Number, required: true },
    question9: { type: Number, required: true },
    readiness: { type: Number, required: true }
  },
  create: function (tech) {
    var node = _.reduce(this.schema, assemblyNode, {}, tech)
    node.readiness = calculateReadiness(node)
    node.slug = slug(node.name.toLowerCase())
    return db.insertNodeAsync(node, "Tech")
  },
  findAll: function () {
    return db.readNodesWithLabelAsync("Tech")
  },
  findById: function (id) {
    return db.readNodeAsync(id)
  },
  update: function (id, tech) {
    id = Number(id)
    var node = _.reduce(this.schema, assemblyNode, {}, tech)
    node.readiness = calculateReadiness(node)
    node.slug = slug(node.name.toLowerCase())
    return db
      .updateNodeAsync(id, node)
      .then(function (success) {
        if (!success) return false
        node._id = id
        return node
      })
  },
  delete: function (id) {
    return db.deleteNodeAsync(id)
  }
}
