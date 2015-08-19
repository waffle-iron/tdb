"use strict"

const db = require("../libs/db")

exports.getNodesById = function (ids) {
  if (Array.isArray(ids)) {
    let list = ids.map(function (id) { return `"${id}"`}).join(",")
    let cypher = `MATCH (nodes) WHERE nodes.id IN [${list}] RETURN nodes`
    return db.cypherQueryAsync(cypher)
  } else {
    return db.cypherQueryAsync(`MATCH (node { id: {ids} }) RETURN node`, { ids })
  }
}
