"use strict"

var express = require("express")
var bodyParser = require("body-parser")
var compression = require("compression")
var controllers = require("./controllers")

var app = express()

app.use(compression())
app.use(bodyParser.json())

controllers.initializeRoutes(app, "/api/v2")
  .then(function () {
    var server = app.listen(process.env.PORT || 3000, function () {
      var host = server.address().address
      var port = server.address().port

      console.log("Listening at http://%s:%s", host, port)
    })
  })

module.exports = app
