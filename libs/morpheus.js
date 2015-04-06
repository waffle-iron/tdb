"use strict"

var _ = require("lodash")
var db = require("../libs/db")
var uuid = require("../libs/uuid")

function assemblyNode (node, field, fieldname) {
  /* jshint validthis: true */
  var raw = this[fieldname]
  node[fieldname] = _.isUndefined(raw) ? raw : field.type(raw)
  return node
}

function firstData (res) {
  return _.first(res.data)
}

function extractLanguage (schema, translations, lang, node) {
  if (lang === "en") {
    _.forEach(_.keys(node), function (prop) {
      if (prop.includes("_")) { delete node[prop] }
    })
    return node
  }

  _.forEach(translations, function (prop) {
    let transKey = `${prop}_${lang}`
    if (!_.isUndefined(node[transKey])) {
      node[prop] = node[transKey]
      delete node[transKey]
    }
  })

  return node
}

function Model (blueprint) {
  const SCHEMA = blueprint.schema
  const TYPE = blueprint.type
  const PRE_SAVE = blueprint.preSave
  const TRANSLATIONS = _.reduce(SCHEMA, function (list, opts, prop) {
    if (opts.hasTranslations) { list.push(prop) }
    return list
  }, [])

  return {
    create: function model$create (doc) {
      let node = _.reduce(SCHEMA, assemblyNode, { id: uuid() }, doc)
      if (PRE_SAVE) { node = PRE_SAVE(node) }
      return db.insertNodeAsync(node, TYPE)
    },
    find: function model$find (conditions, options) {
      let cypher = [
        `MATCH (node:${TYPE}) WITH count(*) AS count`,
        `MATCH (node:${TYPE}) WITH count, node ORDER BY ID(node)`
      ]
      if (!_.isUndefined(options.skip)) {
        cypher.push(`SKIP ${options.skip}`)
      }
      if (!_.isUndefined(options.limit)) {
        cypher.push(`LIMIT ${options.limit}`)
      }
      cypher.push("RETURN { count: count, nodes: COLLECT(node)} AS result")

      return db
        .cypherQueryAsync(cypher.join(" "))
        .then(firstData)
        .then(function (results) {
          let nodes = _.map(
            _.pluck(results.nodes, "data"),
            _.partial(extractLanguage, SCHEMA, TRANSLATIONS, options.lang)
          )
          return {
            count: results.count,
            nodes: nodes
          }
        })
    },
    findById: function model$findById (lang, uuid) {
      let query = `MATCH (node:${TYPE} { id: {uuid} }) RETURN node`
      return db
        .cypherQueryAsync(query, { uuid: uuid })
        .then(firstData)
        .then(_.partial(extractLanguage, SCHEMA, TRANSLATIONS, lang))
    },
    update: function model$update (uuid, doc) {
      let node = _.reduce(SCHEMA, assemblyNode, { id: uuid }, doc)
      if (PRE_SAVE) { node = PRE_SAVE(node) }
      return db
        .updateNodesWithLabelsAndPropertiesAsync(TYPE, { id: uuid }, node)
        .then(_.first)
    },
    delete: function model$delete (uuid) {
      return db.deleteNodesWithLabelsAndPropertiesAsync(TYPE, { id: uuid })
    },
    createTranslation: function (uuid, lang, translation) {
      let propsToTranslate = _.pick(translation, TRANSLATIONS)
      let translated = _.transform(propsToTranslate, function (trans, val, key) {
        let transKey = `${key}_${lang}`
        trans[transKey] = val
      })
      let langLabel = lang.toUpperCase()
      let cypher = `
        MATCH (node:${TYPE} { id: {uuid} })
        SET node :${langLabel}
        SET node += {translated}
        RETURN node
      `
      return db
        .cypherQueryAsync(cypher, { uuid: uuid, translated: translated })
        .then(firstData)
        .then(_.partial(extractLanguage, SCHEMA, TRANSLATIONS, lang))
    }
  }
}

module.exports = Model
