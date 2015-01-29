"use strict"

var Promise = require("bluebird")
var env = process.env.NODE_ENV || "development"
var config = require(__dirname + "/../config")[env]
var Neo4j = require("node-neo4j")

module.exports = Promise.promisifyAll(new Neo4j(config.db.server))
