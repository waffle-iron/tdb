"use strict"

var _ = require("lodash")
var passport = require("passport")
var BearerStrategy = require("passport-http-bearer")
var db = require("../libs/db")

passport.use(new BearerStrategy(
  function (hashToken, done) {
    db.cypherQueryAsync(
      "MATCH (user:User)-[:has_token]->(token:Token {hash: {hash}}) RETURN user, token LIMIT 1",
      { hash: hashToken }
    )
    .then(function (queryRes) {
      return _.first(_.map(queryRes.data, function (data) {
        return _.zipObject(queryRes.columns, data)
      }))
    })
    .then(function (res) {
      if (!res.token) return done(null, false)
      return done(null, res.user)
    })
    .catch(done)
  }
))

exports.isAuthenticated = passport.authenticate("bearer", { session: false })
