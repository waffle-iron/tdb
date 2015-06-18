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
    it("Denies unauthenticated vector creation", function () {
      let vector = random.vector()
      vector.position = 1
      return api
        .post(url("vectors")).send({ vector  })
        .expect(401).endAsync()
    })
  })

  describe("GET /vectors", function () {
    before(function () {
      function createRandomVector () {
        return api
          .post(url("vectors")).send({ vector: random.vector() })
          .set("Authorization", authorization)
          .expect(201).endAsync()
      }

      return createRandomVector()
        .then(createRandomVector)
        .then(createRandomVector)
        .then(createRandomVector)
        .then(createRandomVector)
        .then(createRandomVector)
        .then(createRandomVector)
        .then(createRandomVector)
        .then(createRandomVector)
        .then(createRandomVector)
    })

    it("Get list of vectors", function () {
      return api
        .get(url("vectors"))
        .expect(200).endAsync()
        .then(Test.returnModels)
    })
  })

  describe("GET /vectors/:vector_id", function () {
    var vector
    before(function () {
      return api
        .post(url("vectors")).send({ vector: random.vector() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(function (res) { vector = res.body.vector })
    })

    it("Get a vector by id", function () {
      return api
        .get(url("vectors", vector.id))
        .expect(200).endAsync()
        .then(Test.returnModel)
        .then(Test.haveOnlyModelProperties)
    })
  })

  describe("PUT /vectors/:vector_id", function () {
    var vector
    before(function () {
      return api
        .post(url("vectors")).send({ vector: random.vector() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(function (res) { vector = res.body.vector })
    })

    it("Update a vector", function () {
      vector.question = `Do ${vector.question}`
      return api
        .put(url("vectors", vector.id))
        .send({ vector: vector })
        .set("Authorization", authorization)
        .expect(200).endAsync()
        .then(Test.returnModel)
        .then(Test.haveOnlyModelProperties)
    })

    it("Denies unauthenticated vector update", function () {
      vector.question = `Do ${vector.question}`
      return api
        .put(url("vectors", vector.id))
        .send({ vector: vector })
        .expect(401).endAsync()
    })
  })

  describe("DELETE /vectors/:vector_id", function () {
    var vector
    before(function () {
      return api
        .post(url("vectors")).send({ vector: random.vector() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(function (res) { vector = res.body.vector })
    })

    it("Delete a vector", function () {
      return api
        .delete(url("vectors", vector.id))
        .set("Authorization", authorization)
        .expect(204).endAsync()
        .then(Test.responseEmpty)
    })

    it("Denies unauthorized vector delete", function () {
      return api
        .delete(url("vectors", vector.id))
        .expect(401).endAsync()
    })
  })
})
