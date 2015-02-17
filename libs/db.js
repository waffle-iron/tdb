"use strict"

var Promise = require("bluebird")
var env = process.env.NODE_ENV || "development"
var config = require(__dirname + "/../config")[env]
var Neo4j = require("node-neo4j")

var dbURL = env === "production" ? process.env.GRAPHSTORY_URL : config.db.server

module.exports = Promise.promisifyAll(new Neo4j(dbURL))
