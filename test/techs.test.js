"use strict"

var Promise = require("bluebird")
var request = require("supertest")
var should = require("should")

var server = require("../server")
var url = require("./helpers/url")
var random = require("./helpers/random")

Promise.promisifyAll(request.Test.prototype)

describe("/api/v2/techs resource", function () {
  var api, authorization
  var techProps = [ "id", "name", "slug", "summary", "description", "image",
    "impactBanking", "impactEducation", "impactEntertainment", "impactFood",
    "impactHousing", "impactMedia", "impactMobile", "impactPolicy",
    "impactRetail", "impactRobotics", "impactSustainability",
    "impactTransportation", "impactTravel", "impactWellbeing", "question0",
    "question1", "question2", "question3", "question4", "question5",
    "question6", "question7", "question8", "question9", "readiness" ]

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

  describe("POST /techs", function () {
    it("Creates a tech", function () {
      return api
        .post(url("techs")).send({ tech: random.tech() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(function testResponse (res) {
          var json = res.body
          should.exist(json.tech)
          json.tech.should.have.properties(techProps)
        })
    })
    it("Denies unauthenticated tech creation", function () {
      return api
        .post(url("techs")).send({ tech: random.tech() })
        .expect(401).endAsync()
    })

    describe("POST /techs/:tech_id/translations", function () {
      var tech

      before(function () {
        return api
          .post(url("techs")).send({ tech: random.tech() })
          .set("Authorization", authorization)
          .expect(201).endAsync()
          .then(function (res) {
            tech = res.body.tech
          })
      })

      it("Creates a tech translation", function () {
        return api
          .post(url("techs", tech.id) + "/translations/pt")
          .send({ tech: random.tech() })
          .set("Authorization", authorization)
          .expect(201).endAsync()
          .then(function testResponse (res) {
            var json = res.body
            should.exist(json.tech)
            json.tech.should.have.properties(techProps)
          })
      })

      it("Denies unauthenticated tech translation", function () {
        return api
          .post(url("techs", tech.id) + "/translations/pt")
          .send({ tech: random.tech() })
          .expect(401).endAsync()
      })
    })
  })

  describe("GET /techs", function () {
    before(function () {
      function createRandomTech () {
        return api
          .post(url("techs")).send({ tech: random.tech() })
          .set("Authorization", authorization)
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

    it("Get traslated list of techs", function () {
      return api
        .get(url("techs"))
        .set("Accept-Language", "pt, en;q=0.9")
        .expect(200).endAsync()
        .then(function testResponse (res) {
          var json = res.body
          should.exist(json.techs)
          json.techs.should.not.be.empty
        })
    })

    it("Get a paginated list of techs", function () {
      return api
        .get(url("techs"))
        .query({ limit: 3, skip: 3 })
        .expect(200).endAsync()
        .then(function testResponse (res) {
          var json = res.body
          should.exist(json.techs)
          json.techs.should.be.an.Array.and.have.lengthOf(3)
          should.exist(json.meta)
          json.meta.total.should.be.a.Number
        })
    })

    it("Get a paginated translated list of techs", function () {
      return api
        .get(url("techs"))
        .set("Accept-Language", "pt, en;q=0.9")
        .query({ limit: 3, skip: 3 })
        .expect(200).endAsync()
        .then(function testResponse (res) {
          var json = res.body
          should.exist(json.techs)
          json.techs.should.be.an.Array.and.have.lengthOf(3)
          should.exist(json.meta)
          json.meta.total.should.be.a.Number
        })
    })
  })

  describe("GET /techs/:tech_id", function () {
    var tech, translated
    before(function () {
      return api
        .post(url("techs")).send({ tech: random.tech() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(function (res) {
          tech = res.body.tech
          return tech
        })
        .then(function (tech) {
          translated = random.tech()
          return api
            .post(url("techs", tech.id) + "/translations/pt")
            .send({ tech: translated })
            .set("Authorization", authorization)
            .expect(201).endAsync()
        })
    })

    it("Get a tech by id", function () {
      return api
        .get(url("techs", tech.id))
        .expect(200).endAsync()
        .then(function (res) {
          var json = res.body
          should.exist(json.tech)
          json.tech.should.have.properties(techProps)
        })
    })

    it("Get a translated tech by id", function () {
      return api
        .get(url("techs", tech.id))
        .set("Accept-Language", "pt, en;q=0.9")
        .expect(200).endAsync()
        .then(function (res) {
          var json = res.body
          should.exist(json.tech)
          json.tech.should.have.properties(techProps)
          json.tech.name.should.equal(translated.name)
          json.tech.summary.should.equal(translated.summary)
          json.tech.description.should.equal(translated.description)
        })
    })
  })

  describe("PUT /techs/:tech_id", function () {
    var tech
    before(function () {
      return api
        .post(url("techs")).send({ tech: random.tech() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(function (res) {
          tech = res.body.tech
        })
    })

    it("Update a tech", function () {
      tech.name = tech.name + " 3D"
      return api
        .put(url("techs", tech.id))
        .send({ tech: tech })
        .set("Authorization", authorization)
        .expect(200).endAsync()
        .then(function (res) {
          var json = res.body
          should.exist(json.tech)
          json.tech.should.have.properties(techProps)
        })
    })

    it("Denies unauthenticated tech update", function () {
      tech.name = tech.name + " 3D"
      return api
        .put(url("techs", tech.id))
        .send({ tech: tech })
        .expect(401).endAsync()
    })
  })

  describe("DELETE /techs/:tech_id", function () {
    var tech
    before(function () {
      return api
        .post(url("techs")).send({ tech: random.tech() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(function (res) {
          tech = res.body.tech
        })
    })

    it("Delete a tech", function () {
      return api
        .delete(url("techs", tech.id))
        .set("Authorization", authorization)
        .expect(204).endAsync()
        .then(function (res) {
          res.body.should.be.empty
        })
    })

    it("Denies tech delete", function () {
      return api
        .delete(url("techs", tech.id))
        .expect(401).endAsync()
    })
  })
})
