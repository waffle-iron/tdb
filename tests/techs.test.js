"use strict"

var Promise = require("bluebird")
var request = require("supertest")
var should = require("should")

var server = require("../server")
var url = require("./helpers/url")
var random = require("./helpers/random")

Promise.promisifyAll(request.Test.prototype)

describe("/api/v2/techs resource", function () {
  var api, user, token

  before(function () {
    api = request(server)
    return api
      .post(url("users")).send({ user: random.user() })
      .expect(201).endAsync()
      .then(function setVars (res) {
        var json = res.body
        user = json.user
        token = json.user.tokens[0]
      })
  })

  describe("POST /techs", function () {
    it("Creates a tech", function () {
      return api
        .post(url("techs")).send({ tech: random.tech() })
        .expect(201).endAsync()
        .then(function testResponse (res) {
          var json = res.body
          should.exist(json.tech)
          json.tech.should.have.properties("id", "name", "slug", "summary",
                                          "description", "thumbnail", "picture",
                                          "question0", "question1", "question2",
                                          "question3", "question4", "question5",
                                          "question6", "question7", "question8",
                                          "question9", "readiness")
        })
    })
  })

  describe("GET /techs", function () {
    before(function () {
      function createRandomTech () {
        return api
          .post(url("techs")).send({ tech: random.tech() })
          .expect(201).endAsync()
      }

      return createRandomTech()
        .then(createRandomTech)
        .then(createRandomTech)
        .then(createRandomTech)
        .then(createRandomTech)
        .then(createRandomTech)
        .then(createRandomTech)
        .then(createRandomTech)
        .then(createRandomTech)
        .then(createRandomTech)
    })

    it("Get list of techs", function () {
      return api
        .get(url("techs"))
        .expect(200).endAsync()
        .then(function testResponse (res) {
          var json = res.body
          should.exist(json.techs)
          json.techs.should.not.be.empty
        })
    })
  })

  describe("GET /techs/:tech_id", function () {
    var tech
    before(function () {
      return api
        .post(url("techs")).send({ tech: random.tech() })
        .expect(201).endAsync()
        .then(function (res) {
          tech = res.body.tech
        })
    })

    it("Get a tech by id", function () {
      return api
        .get(url("techs", tech.id))
        .expect(200).endAsync()
        .then(function (res) {
          var json = res.body
          should.exist(json.tech)
          json.tech.should.have.properties("id", "name", "slug", "summary",
                                          "description", "thumbnail", "picture",
                                          "question0", "question1", "question2",
                                          "question3", "question4", "question5",
                                          "question6", "question7", "question8",
                                          "question9", "readiness")
        })
    })
  })
})
