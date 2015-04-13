"use strict"

var Promise = require("bluebird")
var request = require("supertest")

var server = require("../server")
var url = require("./helpers/url")
var random = require("./helpers/random")

var modelName = "link"
var modelProps = [ "id", "title", "url" ]
var Test = require("./helpers/tests")(modelName, modelProps)

Promise.promisifyAll(request.Test.prototype)

describe("/api/v2/startups resource", function () {
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

  describe("POST /links", function () {
    it("Creates a link", function () {
      return api
        .post(url("links")).send({ link: random.link() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(Test.returnModel)
        .then(Test.haveOnlyModelProperties)
    })
    it("Denies unauthenticated link creation", function () {
      return api
        .post(url("links")).send({ link: random.link() })
        .expect(401).endAsync()
    })
  })

  describe("GET /links", function () {
    before(function () {
      function createRandomLink () {
        return api
          .post(url("links")).send({ link: random.link() })
          .set("Authorization", authorization)
          .expect(201).endAsync()
      }

      return createRandomLink()
        .then(createRandomLink)
        .then(createRandomLink)
        .then(createRandomLink)
        .then(createRandomLink)
        .then(createRandomLink)
        .then(createRandomLink)
        .then(createRandomLink)
        .then(createRandomLink)
        .then(createRandomLink)
    })

    it("Get list of links", function () {
      return api
        .get(url("links"))
        .expect(200).endAsync()
        .then(Test.returnModels)
    })

    it("Get translated list of links", function () {
      return api
        .get(url("links"))
        .set("Accept-Language", "pt, en;q=0.9")
        .expect(200).endAsync()
        .then(Test.returnModels)
    })

    it("Get a paginated list of links", function () {
      return api
        .get(url("links"))
        .query({ limit: 3, skip: 3 })
        .expect(200).endAsync()
        .then(Test.returnModels)
        .then(Test.isPaginated(3))
    })

    it("Get a paginated translated list of links", function () {
      return api
        .get(url("links"))
        .set("Accept-Language", "pt, en;q=0.9")
        .query({ limit: 3, skip: 3 })
        .expect(200).endAsync()
        .then(Test.returnModels)
        .then(Test.isPaginated(3))
    })
  })

  describe("GET /links/:link_id", function () {
    var link
    before(function () {
      return api
        .post(url("links")).send({ link: random.link() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(function (res) { link = res.body.link })
    })

    it("Get a link by id", function () {
      return api
        .get(url("links", link.id))
        .expect(200).endAsync()
        .then(Test.returnModel)
        .then(Test.haveOnlyModelProperties)
    })

    it("Get a translated link by id", function () {
      return api
        .get(url("links", link.id))
        .set("Accept-Language", "pt, en;q=0.9")
        .expect(200).endAsync()
        .then(Test.returnModel)
        .then(Test.haveOnlyModelProperties)
    })
  })

  describe("PUT /links/:link_id", function () {
    var link
    before(function () {
      return api
        .post(url("links")).send({ link: random.link() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(function (res) { link = res.body.link })
    })

    it("Update a link", function () {
      link.title = link.title + " 3D"
      return api
        .put(url("links", link.id))
        .send({ link: link })
        .set("Authorization", authorization)
        .expect(200).endAsync()
        .then(Test.returnModel)
        .then(Test.haveOnlyModelProperties)
    })

    it("Denies unauthenticated link update", function () {
      link.title = link.title + " 3D"
      return api
        .put(url("links", link.id))
        .send({ link: link })
        .expect(401).endAsync()
    })
  })

  describe("DELETE /links/:link_id", function () {
    var link
    before(function () {
      return api
        .post(url("links")).send({ link: random.link() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(function (res) { link = res.body.link })
    })

    it("Delete a link", function () {
      return api
        .delete(url("links", link.id))
        .set("Authorization", authorization)
        .expect(204).endAsync()
        .then(Test.responseEmpty)
    })

    it("Denies link delete", function () {
      return api
        .delete(url("links", link.id))
        .expect(401).endAsync()
    })
  })
})
