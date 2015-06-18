"use strict"

var Promise = require("bluebird")
var request = require("supertest")

var server = require("../server")
var url = require("./helpers/url")
var random = require("./helpers/random")

var modelName = "vector"
var modelProps = [ "id", "position", "question", "levels"]
var Test = require("./helpers/tests")(modelName, modelProps)

Promise.promisifyAll(request.Test.prototype)

describe("/api/v2/vectors resource", function () {
  var api, authorization

  before(function () {
    api = request(server)
    return api
      .post(url("users")).send({ user: random.user() })
      .expect(201).endAsync()
      .then(function setVars (res) {
        var json = res.body
        authorization = "Bearer " + json.user.tokens[0]
      })
  })

  describe("POST /vectors", function () {
    it("Creates a vector", function () {
      let vector = random.vector()
      vector.position = 1
      return api
        .post(url("vectors")).send({ vector })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(Test.returnModel)
        .then(Test.haveOnlyModelProperties)
    })
  })
})
