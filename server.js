"use strict"

var bodyParser = require("body-parser")
var compression = require("compression")
var controllers = require("./controllers")
var express = require("express")
var morgan = require("morgan")

var env = process.env.NODE_ENV || "development"

var app = express()

app.use(compression())
app.use(bodyParser.json())

if (env === "development") app.use(morgan("dev"))
else if (env === "production") app.use(morgan("combined", { skip: successes }))

function successes (req, res) {
  return res.statusCode < 400
}

controllers.initializeRoutes(app, "/api/v2")
  .then(function () {
    var server = app.listen(process.env.PORT || 3000, function () {
      var host = server.address().address
      var port = server.address().port

      console.log("Listening at http://%s:%s", host, port)
    })
  })

module.exports = app
