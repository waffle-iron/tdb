"use strict"

var express = require("express")
var bodyParser = require("body-parser")
var compression = require("compression")
var users = require("./controllers/users")

var app = express()

app.use(compression())
app.use(bodyParser.json())

var userRouter = express.Router()
userRouter
  .post("/", users.create)

app.use("/api/v2/users", userRouter)

var server = app.listen(process.env.PORT || 3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("Listening at http://%s:%s", host, port)
})

module.exports = app
