"use strict"

var Promise = require("bluebird")
var request = require("supertest")
var should = require("should")

var server = require("../server")
var url = require("./helpers/url")
var random = require("./helpers/random")

Promise.promisifyAll(request.Test.prototype)

describe("/api/v2/startups resource", function () {
  var api, authorization
  var startupProps = [ "id", "name", "slug", "summary", "image", "websiteUrl",
                    "twitterUrl", "crunchbaseUrl", "angelUrl" ]

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

  describe("POST /startups", function () {
    it("Creates a startup", function () {
      return api
        .post(url("startups")).send({ startup: random.startup() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(function testResponse (res) {
          var json = res.body
          should.exist(json.startup)
          json.startup.should.have.properties(startupProps)
        })
    })
    it("Denies unauthenticated startup creation", function () {
      return api
        .post(url("startups")).send({ startup: random.startup() })
        .expect(401).endAsync()
    })

    describe("POST /startups/:startup_id/translations", function () {
      var startup

      before(function () {
        return api
          .post(url("startups")).send({ startup: random.startup() })
          .set("Authorization", authorization)
          .expect(201).endAsync()
          .then(function (res) {
            startup = res.body.startup
          })
      })

      it("Creates a startup translation", function () {
        return api
          .post(url("startups", startup.id) + "/translations/pt")
          .send({ startup: random.startup() })
          .set("Authorization", authorization)
          .expect(201).endAsync()
          .then(function testResponse (res) {
            var json = res.body
            should.exist(json.startup)
            json.startup.should.have.properties(startupProps)
          })
      })

      it("Denies unauthenticated startup translation", function () {
        return api
          .post(url("startups", startup.id) + "/translations/pt")
          .send({ startup: random.startup() })
          .expect(401).endAsync()
      })
    })
  })

  describe("GET /startups", function () {
    before(function () {
      function createRandomStartup () {
        return api
          .post(url("startups")).send({ startup: random.startup() })
          .set("Authorization", authorization)
          .expect(201).endAsync()
      }

      return createRandomStartup()
        .then(createRandomStartup)
        .then(createRandomStartup)
        .then(createRandomStartup)
        .then(createRandomStartup)
        .then(createRandomStartup)
        .then(createRandomStartup)
        .then(createRandomStartup)
        .then(createRandomStartup)
        .then(createRandomStartup)
    })

    it("Get list of startups", function () {
      return api
        .get(url("startups"))
        .expect(200).endAsync()
        .then(function testResponse (res) {
          var json = res.body
          should.exist(json.startups)
          json.startups.should.not.be.empty
        })
    })

    it("Get translated list of startups", function () {
      return api
        .get(url("startups"))
        .set("Accept-Language", "pt, en;q=0.9")
        .expect(200).endAsync()
        .then(function testResponse (res) {
          var json = res.body
          should.exist(json.startups)
          json.startups.should.not.be.empty
        })
    })

    it("Get a paginated list of startups", function () {
      return api
        .get(url("startups"))
        .query({ limit: 3, skip: 3 })
        .expect(200).endAsync()
        .then(function testResponse (res) {
          var json = res.body
          should.exist(json.startups)
          json.startups.should.be.an.Array.and.have.lengthOf(3)
          should.exist(json.meta)
          json.meta.total.should.be.a.Number
        })
    })

    it("Get a paginated translated list of startups", function () {
      return api
        .get(url("startups"))
        .set("Accept-Language", "pt, en;q=0.9")
        .query({ limit: 3, skip: 3 })
        .expect(200).endAsync()
        .then(function testResponse (res) {
          var json = res.body
          should.exist(json.startups)
          json.startups.should.be.an.Array.and.have.lengthOf(3)
          should.exist(json.meta)
          json.meta.total.should.be.a.Number
        })
    })
  })

  describe("GET /startups/:startup_id", function () {
    var startup, translated
    before(function () {
      return api
        .post(url("startups")).send({ startup: random.startup() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(function (res) {
          startup = res.body.startup
          return startup
        })
        .then(function (startup) {
          translated = random.startup()
          return api
            .post(url("startups", startup.id) + "/translations/pt")
            .send({ startup: translated })
            .set("Authorization", authorization)
            .expect(201).endAsync()
        })
    })

    it("Get a startup by id", function () {
      return api
        .get(url("startups", startup.id))
        .expect(200).endAsync()
        .then(function (res) {
          var json = res.body
          should.exist(json.startup)
          json.startup.should.have.properties(startupProps)
        })
    })

    it("Get a translated startup by id", function () {
      return api
        .get(url("startups", startup.id))
        .set("Accept-Language", "pt, en;q=0.9")
        .expect(200).endAsync()
        .then(function (res) {
          var json = res.body
          should.exist(json.startup)
          json.startup.should.have.properties(startupProps)
          json.startup.name.should.equal(translated.name)
          json.startup.summary.should.equal(translated.summary)
        })
    })
  })

  describe("PUT /startups/:startup_id", function () {
    var startup
    before(function () {
      return api
        .post(url("startups")).send({ startup: random.startup() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(function (res) {
          startup = res.body.startup
        })
    })

    it("Update a startup", function () {
      startup.name = startup.name + " 3D"
      return api
        .put(url("startups", startup.id))
        .send({ startup: startup })
        .set("Authorization", authorization)
        .expect(200).endAsync()
        .then(function (res) {
          var json = res.body
          should.exist(json.startup)
          json.startup.should.have.properties(startupProps)
        })
    })

    it("Denies unauthenticated startup update", function () {
      startup.name = startup.name + " 3D"
      return api
        .put(url("startups", startup.id))
        .send({ startup: startup })
        .expect(401).endAsync()
    })

    describe("PUT /startups/:startup_id/translations", function () {
      var startup, translated

      before(function () {
        return api
          .post(url("startups")).send({ startup: random.startup() })
          .set("Authorization", authorization)
          .expect(201).endAsync()
          .then(function (res) {
            startup = res.body.startup
            return api
              .post(url("startups", startup.id) + "/translations/pt")
              .send({ startup: random.startup() })
              .set("Authorization", authorization)
              .expect(201).endAsync()
              .then(function testResponse (res) {
                translated = res.body.startup
              })
          })
      })

      it("Updates a startup translation", function () {
        return api
          .put(url("startups", startup.id) + "/translations/pt")
          .send({ startup: random.startup() })
          .set("Authorization", authorization)
          .expect(200).endAsync()
          .then(function testResponse (res) {
            var json = res.body
            should.exist(json.startup)
            json.startup.should.have.properties(startupProps)
          })
      })

      it("Denies unauthenticated update startup translation", function () {
        return api
          .put(url("startups", startup.id) + "/translations/pt")
          .send({ startup: random.startup() })
          .expect(401).endAsync()
      })
    })
  })

  describe("DELETE /startups/:startup_id", function () {
    var startup
    before(function () {
      return api
        .post(url("startups")).send({ startup: random.startup() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(function (res) {
          startup = res.body.startup
        })
    })

    it("Delete a startup", function () {
      return api
        .delete(url("startups", startup.id))
        .set("Authorization", authorization)
        .expect(204).endAsync()
        .then(function (res) {
          res.body.should.be.empty
        })
    })

    it("Denies startup delete", function () {
      return api
        .delete(url("startups", startup.id))
        .expect(401).endAsync()
    })
  })
})
