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

function extractNodeId (url) {
  let results = /node\/(\d+)$/.exec(url)
  return results[1]
}

function typeToKey (type) {
  return type.toLowerCase() + "s"
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
      let matchStatements = []
      let withStatements = []
      let returnStatements = []

      matchStatements.push(`MATCH (node:${TYPE}) WITH COUNT(*) AS count`)
      withStatements.push("count")
      returnStatements.push("count")

      withStatements.push("node")
      let withVars = withStatements.join(",")
      let skip = _.isUndefined(options.skip) ? "" : `SKIP ${options.skip}`
      let limit = _.isUndefined(options.limit) ? "" : `LIMIT ${options.limit}`
      matchStatements.push(`MATCH (node:${TYPE}) WITH ${withVars} ORDER BY ID(node) ${skip} ${limit}`)
      returnStatements.push("COLLECT(DISTINCT node) AS node")

      _.forEach(RELATIONSHIPS, function (relationship) {
        let label = relationship.other
        let name = label.toLowerCase()
        let rel = `${name}Rel`
        withStatements.push(name)
        withStatements.push(rel)
        returnStatements.push(`COLLECT(DISTINCT ${name}) AS ${name}`)
        returnStatements.push(`COLLECT(${rel}) AS ${rel}`)
        let withVars = withStatements.join(", ")
        matchStatements.push(`OPTIONAL MATCH (node:${TYPE})-[${rel}]-(${name}:${label}) WITH ${withVars}`)
      })

      let matches = matchStatements.join(" ")
      let returns = returnStatements.join(", ")
      let cypher = `${matches} RETURN ${returns}`

      return db
        .cypherQueryAsync(cypher)
        .then(function (results) {
          let zipped = _.zipObject(results.columns, _.first(results.data))

          let count;
          let nodes = []
          let relationships = []
          _.forEach(zipped, function (items, key) {
            if (key === "count") { count = items }
            else if (key.endsWith("Rel")) { relationships = _.union(relationships, items) }
            else { nodes = _.union(nodes, items) }
          })

          let relationshipIdHash = relationships.reduce(function (acc, rel) {
            let start = extractNodeId(rel.start)
            let end = extractNodeId(rel.end)
            ;(acc[start] || (acc[start] = [])).push(end)
            ;(acc[end] || (acc[end] = [])).push(start)
            return acc
          }, {})

          let mainNodes = []
          let nodesById = nodes.reduce(function (acc, node) {
            let id = node.metadata.id
            acc[id] = node

            if (node.metadata.labels.indexOf(TYPE) !== -1) { mainNodes.push(id) }
            return acc
          }, {})

          let builtData = mainNodes.map(function (id) {
            let node = nodesById[id]
            let data = node.data
            let nodeRelationships = relationshipIdHash[id]
            if (nodeRelationships) {
              nodeRelationships
                .map(function (id) { return nodesById[id]})
                .forEach(function (related) {
                  let key = typeToKey(related.metadata.labels[0])
                  ;(data[key] || (data[key] = [])).push(related.data.id)
                })
            }

            return data
          })
          return { count: count, nodes: builtData }
        })
        .then(function (results) {
          return {
            count: results.count,
            nodes: _.map(
              results.nodes,
              _.partial(extractLanguage, SCHEMA, TRANSLATIONS, options.lang)
            )
          }
        })
    },
    findById: function model$findById (lang, uuid) {
      let queryParts = {
        match: {
          cypher: `MATCH (node:${TYPE} { id: {uuid} })`,
          ret: "node"
        },
        optional: []
      }
      _.forEach(RELATIONSHIPS, function (relationship) {
        let label = relationship.other
        let name = label.toLowerCase()
        queryParts.optional.push({
          cypher: `OPTIONAL MATCH (node:${TYPE} { id: {uuid} })--(${name}:${label})`,
          ret: name
        })
      })

      let matches = _.union([queryParts.match.cypher], _.pluck(queryParts.optional, "cypher")).join(" ")
      let rets = _.union([queryParts.match.ret], _.pluck(queryParts.optional, "ret")).join(",")
      let query = `${matches} RETURN ${rets}`
      return db
        .cypherQueryAsync(query, { uuid: uuid })
        .then(function (results) {
          let joinedResults = _.map(results.data, function (result) {
            if (!_.isArray(result)) { return result }

            let node = _.first(result)
            let relationships = _.pluck(_.tail(result), "id")
            let relationshipTypes = _.tail(results.columns).map(function (name) { return `${name}s` })
            let pairs = _.zip(relationshipTypes, [ relationships ])
            let obj = _.zipObject(pairs)
            return _.assign(node, obj)
          })
          return _.reduce(joinedResults, function (a, b) {
            _.forEach(RELATIONSHIPS, function (relationship) {
              let name = relationship.other.toLowerCase()
              let prop = `${name}s`
              a[prop] = _.union(a[prop], b[prop])
            })
            return a
          })
        })
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
