"use strict"

var Promise = require("bluebird")
var _ = require("lodash")
var bcrypt = Promise.promisifyAll(require("bcryptjs"))
var crypto = require("crypto")
var db = require("../libs/db")
var slug = require("slug")
var Model = require("../libs/morpheus")
var hmean = require("compute-hmean")

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
  let values = _.range(10)
                .map(function (n) { return tech["question" + n]})
                .filter(function (n) { return n >= 1 })
  return hmean(values)
}

exports.Tech = new Model({
  type: "Tech",
  schema: {
    name: { type: String, hasTranslations: true },
    summary: { type: String, hasTranslations: true },
    description: { type: String, hasTranslations: true },
    image: { type: String },
    impactBanking: { type: Number },
    impactEducation: { type: Number },
    impactEntertainment: { type: Number },
    impactFood: { type: Number },
    impactHousing: { type: Number },
    impactMedia: { type: Number },
    impactMobile: { type: Number },
    impactPolicy: { type: Number },
    impactRetail: { type: Number },
    impactRobotics: { type: Number },
    impactSustainability: { type: Number },
    impactTransportation: { type: Number },
    impactTravel: { type: Number },
    impactWellbeing: { type: Number },
    question0: { type: Number },
    question1: { type: Number },
    question2: { type: Number },
    question3: { type: Number },
    question4: { type: Number },
    question5: { type: Number },
    question6: { type: Number },
    question7: { type: Number },
    question8: { type: Number },
    question9: { type: Number },
  },
  relationships: {
    startups: {
      direction: "in",
      label: "develops",
      other: "Startup",
      timestamp: true
    }
  },
  preSave: function (node) {
    node.slug = slug(node.name.toLowerCase())
    node.readiness = calculateReadiness(node)
    return node
  }
})

exports.Startup = new Model({
  type: "Startup",
  schema: {
    name: { type: String, hasTranslations: true },
    summary: { type: String, hasTranslations: true },
    image: { type: String },
    websiteUrl: { type: String },
    twitterUrl: { type: String },
    crunchbaseUrl: { type: String },
    angelUrl: { type: String }
  },
  relationships: {
    techs: {
      direction: "out",
      label: "develops",
      other: "Tech",
      timestamp: true
    }
  },
  preSave: function (node) {
    node.slug = slug(node.name.toLowerCase())
    return node
  }
})

exports.Link = new Model({
  type: "Link",
  schema: {
    title: { type: String },
    url: { type: String }
  }
})

exports.Vector = new Model({
  type: "Vector",
  schema: {
    levels: { type: Array },
    position: { type: Number },
    question: { type: String }
  }
})
