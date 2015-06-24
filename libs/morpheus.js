"use strict"

var _ = require("lodash")
var Promise = require("bluebird")
var db = require("../libs/db")
var uuid = require("../libs/uuid")

function assemblyNode (node, field, fieldname) {
  /* jshint validthis: true */
  var raw = this[fieldname]
  if (_.isUndefined(raw)) {
    node[fieldname] = raw
  } else if (field.type.name === "Array" && _.isArray(raw)) {
    node[fieldname] = raw
  } else {
    node[fieldname] = field.type(raw)
  }

  return node
}

function firstData (res) {
  return _.first(res.data)
}

function cleanNode (node) {
  delete node._id
  return node
}

function cleanNodes (nodes) {
  if (_.isArray(nodes)) {
    return _.map(nodes, cleanNode)
  }
  return cleanNode(nodes)
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
  const RELATIONSHIPS = blueprint.relationships || []
  const TRANSLATIONS = _.reduce(SCHEMA, function (list, opts, prop) {
    if (opts.hasTranslations) { list.push(prop) }
    return list
  }, [])

  return {
    create: function model$create (doc) {
      let node = _.reduce(SCHEMA, assemblyNode, { id: uuid() }, doc)
      if (PRE_SAVE) { node = PRE_SAVE(node) }
      return db.insertNodeAsync(node, TYPE)
        .then(function (node) {
          let relationshipsCreated = {}
          let creatingAllRelationships = _.map(RELATIONSHIPS, function (relationship) {
            let otherLabel = relationship.other
            let relProp = otherLabel.toLowerCase() + "s"
            let relatedUids = doc[relProp]
            if (_.isEmpty(relatedUids)) { return }

            let relatedList = relatedUids.map(function (uid) { return `"${uid}"`}).join(",")

            let getRelatedUidNodes = `MATCH (nodes:${otherLabel})
                                      WHERE nodes.id IN [${relatedList}]
                                      RETURN nodes`
            return db
              .cypherQueryAsync(getRelatedUidNodes)
              .then(function (res) {
                let uidToId = _.reduce(res.data, function (map, obj) {
                  map[obj.id] = obj._id
                  return map
                  }, {})
                let creatingRelationships = _.map(uidToId, function (id, uid) {
                  let data = {}
                  if (relationship.timestamp) {
                    data.created = new Date().getTime()
                  }

                  let creatingRelationship = relationship.direction === "out" ?
                    db.insertRelationshipAsync(node._id, id, relationship.label, data) :
                    db.insertRelationshipAsync(id, node._id, relationship.label, data)
                  return creatingRelationship.then(function () {
                    if (_.isUndefined(relationshipsCreated[relProp])) {
                      relationshipsCreated[relProp] = []
                    }
                    relationshipsCreated[relProp].push(uid)
                  })
                })

                return Promise.all(creatingRelationships)
              })
          })
          return Promise
            .all(creatingAllRelationships)
            .then(function () {
              return _.extend(node, relationshipsCreated)
            })
        })
        .then(cleanNodes)
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
          if (!results) {
            return { count: 0, nodes: [] }
          }

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
        .then(cleanNodes)
        .then(_.partial(extractLanguage, SCHEMA, TRANSLATIONS, lang))
    },
    update: function model$update (uuid, doc) {
      let node = _.reduce(SCHEMA, assemblyNode, { id: uuid }, doc)
      if (PRE_SAVE) { node = PRE_SAVE(node) }
      return db
        .updateNodesWithLabelsAndPropertiesAsync(TYPE, { id: uuid }, node)
        .then(_.first)
        .then(cleanNodes)
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
        .then(cleanNodes)
        .then(_.partial(extractLanguage, SCHEMA, TRANSLATIONS, lang))
    }
  }
}

module.exports = Model
