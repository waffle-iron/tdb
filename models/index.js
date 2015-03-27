"use strict"

var Promise = require("bluebird")
var _ = require("lodash")
var bcrypt = Promise.promisifyAll(require("bcrypt"))
var crypto = require("crypto")
var db = require("../libs/db")
var slug = require("slug")
var uuid = require("../libs/uuid")

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
    id: { type: String, required: true },
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
  translations: {
    props: ["name", "summary", "description"]
  },
  create: function (tech) {
    var node = _.reduce(this.schema, assemblyNode, {}, tech)
    node.readiness = calculateReadiness(node)
    node.slug = slug(node.name.toLowerCase())
    node.id = uuid()

    return db.insertNodeAsync(node, "Tech")
  },
  createTranslation: function (uuid, lang, translation) {
    var propsToTranslate = _.pick(translation, this.translations.props)
    var translated = _.transform(propsToTranslate, function (trans, val, key) {
      var transKey = [key, lang].join("_")
      trans[transKey] = val
    })
    var langLabel = lang.toUpperCase()
    var cypher = [
      "MATCH (tech:Tech { id: {uuid} })",
      "SET tech :" + langLabel,
      "SET tech += {translated}",
      "RETURN tech"
    ]
    return db
      .cypherQueryAsync(
        cypher.join(" "),
        { uuid: uuid, translated: translated }
      )
      .then(function (res) { return _.first(res.data) })
      .then(this.filterForLanguage.bind(this, lang))
  },
  filterForLanguage: function (lang, node) {
    if (lang === "en") return _.pick(node, _.keys(this.schema))

    _.forEach(this.translations.props, function (prop) {
      var transKey = [prop, lang].join("_")
      if (!_.isUndefined(node[transKey])) {
        node[prop] = node[transKey]
        delete node[transKey]
      }
    })

    return node
  },
  find: function (criteria, options) {
    var cypher = [
      "MATCH (tech:Tech) WITH count(*) AS count",
      "MATCH (tech:Tech) WITH tech, count ORDER BY ID(tech)",
    ]

    if (!_.isUndefined(options.skip)) {
      cypher.push("SKIP " + options.skip)
    }
    if (!_.isUndefined(options.limit)) {
      cypher.push("LIMIT " + options.limit)
    }

    cypher.push("RETURN {count: count, nodes: collect(tech)} AS result")

    return db
      .cypherQueryAsync(cypher.join(" "))
      .then(function (res) {
        var results = _.first(res.data)
        return {
          count: results.count,
          nodes: _.map(results.nodes, function (rawNode) {
            return _.extend({ _id: rawNode.metadata.id }, rawNode.data)
          })
        }
      })
  },
  findById: function (lang, uuid) {
    return db
      .cypherQueryAsync(
        "MATCH (tech:Tech { id: {uuid} }) RETURN tech",
        { uuid: uuid }
      )
      .then(function (res) { return _.first(res.data) })
      .then(this.filterForLanguage.bind(this, lang))
  },
  update: function (uuid, tech) {
    var node = _.reduce(this.schema, assemblyNode, {}, tech)
    node.readiness = calculateReadiness(node)
    node.slug = slug(node.name.toLowerCase())

    return db
      .updateNodesWithLabelsAndPropertiesAsync("Tech", { id: uuid }, node)
      .then(_.first)
  },
  delete: function (uuid) {
    return db.deleteNodesWithLabelsAndPropertiesAsync("Tech", { id: uuid })
  }
}
