"use strict"

var Promise = require("bluebird")
var _ = require("lodash")
var request = require("supertest")

var server = require("../server")
var url = require("./helpers/url")
var random = require("./helpers/random")

var modelName = "startup"
var modelProps = [ "id", "name", "slug", "summary", "image", "websiteUrl",
                  "twitterUrl", "crunchbaseUrl", "angelUrl" ]
var modelRelationships = [ "techs" ]
var Test = require("./helpers/tests")(modelName, modelProps, modelRelationships)

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

  describe("POST /startups", function () {
    it("Creates a startup", function () {
      return api
        .post(url("startups")).send({ startup: random.startup() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(Test.returnModel)
        .then(Test.haveOnlyModelProperties)
    })
    it("Denies unauthenticated startup creation", function () {
      return api
        .post(url("startups")).send({ startup: random.startup() })
        .expect(401).endAsync()
    })

    it("Creates a startup with technologies", function () {
      return api
        .post(url("techs")).send({ tech: random.tech() })
        .set("Authorization", authorization)
        .endAsync()
        .then(function (res) {
          let tech = res.body.tech
          let startup = random.startup()
          startup.techs = [ tech.id ]
          return api
            .post(url("startups")).send({ startup })
            .set("Authorization", authorization)
            .expect(201).endAsync()
            .then(Test.returnModel)
            .then(function (res) {
              let model = res.body.startup
              model.should.have.properties(modelProps)
              model.should.have.property("techs").with.lengthOf(1)
            })
        })
    })

    describe("POST /startups/:startup_id/translations", function () {
      var startup

      before(function () {
        return api
          .post(url("startups")).send({ startup: random.startup() })
          .set("Authorization", authorization)
          .expect(201).endAsync()
          .then(function (res) { startup = res.body.startup })
      })

      it("Creates a startup translation", function () {
        return api
          .post(url("startups", startup.id) + "/translations/pt")
          .send({ startup: random.startup() })
          .set("Authorization", authorization)
          .expect(201).endAsync()
          .then(Test.returnModel)
          .then(Test.haveOnlyModelProperties)
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
        .then(Test.returnModels)
    })

    it("Get translated list of startups", function () {
      return api
        .get(url("startups"))
        .set("Accept-Language", "pt, en;q=0.9")
        .expect(200).endAsync()
        .then(Test.returnModels)
    })

    it("Get a paginated list of startups", function () {
      return api
        .get(url("startups"))
        .query({ limit: 3, skip: 3 })
        .expect(200).endAsync()
        .then(Test.returnModels)
        .then(Test.isPaginated(3))
    })

    it("Get a paginated translated list of startups", function () {
      return api
        .get(url("startups"))
        .set("Accept-Language", "pt, en;q=0.9")
        .query({ limit: 3, skip: 3 })
        .expect(200).endAsync()
        .then(Test.returnModels)
        .then(Test.isPaginated(3))
    })
  })

  describe("GET /startups/:startup_id", function () {
    var startup, tech, tech2, translated
    before(function () {
      function createTech () {
        return api
          .post(url("techs")).send({ tech: random.tech() })
          .set("Authorization", authorization)
          .endAsync()
      }
      return createTech()
        .then(function (res) { tech = res.body.tech })
        .then(createTech)
        .then(function (res) { tech2 = res.body.tech })
        .then(function () {
          startup = random.startup()
          startup.techs = [ tech.id, tech2.id ]
          return api
            .post(url("startups")).send({ startup: startup })
            .set("Authorization", authorization)
            .expect(201).endAsync()
            .then(function (res) {
              startup = res.body.startup
              return startup
            })
        })
        .then(function () {
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
        .then(Test.returnModel)
        .then(Test.haveOnlyModelProperties)
        .then(function (res) {
          res.body.startup.techs.should.be.Array.an.have.lengthOf(2)
        })
    })

    it("Get a translated startup by id", function () {
      return api
        .get(url("startups", startup.id))
        .set("Accept-Language", "pt, en;q=0.9")
        .expect(200).endAsync()
        .then(Test.returnModel)
        .then(Test.haveOnlyModelProperties)
        .then(Test.haveMatchingProperties(
                _.pick(translated, [ "name", "summary" ])
        ))
    })
  })

  describe("PUT /startups/:startup_id", function () {
    var startup
    before(function () {
      return api
        .post(url("startups")).send({ startup: random.startup() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(function (res) { startup = res.body.startup })
    })

    it("Update a startup", function () {
      startup.name = startup.name + " 3D"
      return api
        .put(url("startups", startup.id))
        .send({ startup: startup })
        .set("Authorization", authorization)
        .expect(200).endAsync()
        .then(Test.returnModel)
        .then(Test.haveOnlyModelProperties)
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
              .then(function (res) { translated = res.body.startup })
          })
      })

      it("Updates a startup translation", function () {
        return api
          .put(url("startups", startup.id) + "/translations/pt")
          .send({ startup: random.startup() })
          .set("Authorization", authorization)
          .expect(200).endAsync()
          .then(Test.returnModel)
          .then(Test.haveOnlyModelProperties)
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
        .then(function (res) { startup = res.body.startup })
    })

    it("Delete a startup", function () {
      return api
        .delete(url("startups", startup.id))
        .set("Authorization", authorization)
        .expect(204).endAsync()
        .then(Test.responseEmpty)
    })

    it("Denies startup delete", function () {
      return api
        .delete(url("startups", startup.id))
        .expect(401).endAsync()
    })
  })
})
