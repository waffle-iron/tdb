"use strict"

var passport = require("passport")
var BearerStrategy = require("passport-http-bearer")
var models = require("../models")

passport.use(new BearerStrategy(
  function (hashToken, done) {
    models.Token
      .whereAsync(
        { hash: hashToken },
        { limit: 1,
          include: {
            User: {
              model: models.User,
              rel: "has_token",
              direction: "in"
            }
          }
        }
      )
      .then(function (tokens) {
        if (tokens.length === 0) {
          return done(null, false)
        }

        return done(null, tokens[0].User)
      })
      .catch(done)
  }
))

exports.isAuthenticated = passport.authenticate("bearer", { session: false })
