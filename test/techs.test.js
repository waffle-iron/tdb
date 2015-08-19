"use strict"

var Promise = require("bluebird")
var _ = require("lodash")
var request = require("supertest")

var server = require("../server")
var url = require("./helpers/url")
var random = require("./helpers/random")

var modelName = "tech"
var modelProps = [ "id", "name", "slug", "summary", "description", "image",
  "impactBanking", "impactEducation", "impactEntertainment", "impactFood",
  "impactHousing", "impactMedia", "impactMobile", "impactPolicy",
  "impactRetail", "impactRobotics", "impactSustainability",
  "impactTransportation", "impactTravel", "impactWellbeing", "question0",
  "question1", "question2", "question3", "question4", "question5", "question6",
  "question7", "question8", "question9", "readiness" ]
var modelRelationships = [ "startups" ]
var Test = require("./helpers/tests")(modelName, modelProps, modelRelationships)

Promise.promisifyAll(request.Test.prototype)

describe("/api/v2/techs resource", function () {
  let api, authorization

  function createStartup (startup) {
    return api
      .post(url("startups")).send({ startup })
      .set("Authorization", authorization)
      .expect(201).endAsync()
  }

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
        .then(Test.returnModel)
        .then(Test.haveOnlyModelProperties)
    })
    it("Denies unauthenticated tech creation", function () {
      return api
        .post(url("techs")).send({ tech: random.tech() })
        .expect(401).endAsync()
    })
    it("Creates a tech with startups", function () {
      let startup
      return api
        .post(url("startups")).send({ startup: random.startup() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(function (res) { startup = res.body.startup })
        .then(function () {
          let tech = random.tech()
          tech.startups = [ startup.id ]
          return api
            .post(url("techs")).send({ tech })
            .set("Authorization", authorization)
            .expect(201).endAsync()
            .then(Test.returnModel)
            .then(function (res) {
              let model = res.body.tech
              model.should.have.properties(modelProps)
              model.should.have.property("startups").with.lengthOf(1)
            })
        })
    })

    describe("POST /techs/:tech_id/translations", function () {
      var tech

      before(function () {
        return api
          .post(url("techs")).send({ tech: random.tech() })
          .set("Authorization", authorization)
          .expect(201).endAsync()
          .then(function (res) { tech = res.body.tech })
      })

      it("Creates a tech translation", function () {
        return api
          .post(url("techs", tech.id) + "/translations/pt")
          .send({ tech: random.tech() })
          .set("Authorization", authorization)
          .expect(201).endAsync()
          .then(Test.returnModel)
          .then(Test.haveOnlyModelProperties)
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
        .then(Test.returnModels)
    })

    it("Get traslated list of techs", function () {
      return api
        .get(url("techs"))
        .set("Accept-Language", "pt, en;q=0.9")
        .expect(200).endAsync()
        .then(Test.returnModels)
    })

    it("Get a paginated list of techs", function () {
      return api
        .get(url("techs"))
        .query({ limit: 3, skip: 3 })
        .expect(200).endAsync()
        .then(Test.returnModels)
        .then(Test.isPaginated(3))
    })

    it("Get a paginated translated list of techs", function () {
      return api
        .get(url("techs"))
        .set("Accept-Language", "pt, en;q=0.9")
        .query({ limit: 3, skip: 3 })
        .expect(200).endAsync()
        .then(Test.returnModels)
        .then(Test.isPaginated(3))
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
        .then(Test.returnModel)
        .then(Test.haveOnlyModelProperties)
    })

    it("Get a translated tech by id", function () {
      return api
        .get(url("techs", tech.id))
        .set("Accept-Language", "pt, en;q=0.9")
        .expect(200).endAsync()
        .then(Test.returnModel)
        .then(Test.haveOnlyModelProperties)
        .then(Test.haveMatchingProperties(
                _.pick(translated, [ "name", "summary", "description"])
        ))
    })
  })

  describe("PUT /techs/:tech_id", function () {
    var tech
    before(function () {
      return api
        .post(url("techs")).send({ tech: random.tech() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(function (res) { tech = res.body.tech })
    })

    it("Update a tech", function () {
      tech.name = tech.name + " 3D"
      return api
        .put(url("techs", tech.id))
        .send({ tech: tech })
        .set("Authorization", authorization)
        .expect(200).endAsync()
        .then(Test.returnModel)
        .then(Test.haveOnlyModelProperties)
    })

    it("Denies unauthenticated tech update", function () {
      tech.name = tech.name + " 3D"
      return api
        .put(url("techs", tech.id))
        .send({ tech: tech })
        .expect(401).endAsync()
    })

    it.only("Updates a tech with startups", function () {
      let startup1, startup2, startup3
      return Promise
        .all([ createStartup(random.startup()), createStartup(random.startup()) ,createStartup(random.startup()) ])
        .then(function (res) {
          startup1 = res[0].body.startup
          startup2 = res[1].body.startup
          startup3 = res[2].body.startup
        })
        .then(function () {
          let tech = random.tech()
          tech.startups = [ startup1.id, startup2.id ]
          return api
            .post(url("techs")).send({ tech })
            .set("Authorization", authorization)
            .expect(201).endAsync()
        })
        .then(function (res) {
          let tech = res.body.tech
          tech.startups = [ startup2.id, startup3 ]
          return api
            .put(url("techs", tech.id)).send({ tech })
            .set("Authorization", authorization)
            .expect(200).endAsync()
        })
        .then(Test.returnModel)
        .then(function (res) {
          let model = res.body.tech
          model.should.have.properties(modelProps)
          model.should.have.property("startups").with.lengthOf(2)
        })
    })

    describe("PUT /techs/:tech_id/translations", function () {
      var tech, translated

      before(function () {
        return api
          .post(url("techs")).send({ tech: random.tech() })
          .set("Authorization", authorization)
          .expect(201).endAsync()
          .then(function (res) {
            tech = res.body.tech
            return api
              .post(url("techs", tech.id) + "/translations/pt")
              .send({ tech: random.tech() })
              .set("Authorization", authorization)
              .expect(201).endAsync()
              .then(function (res) { translated = res.body.tech })
          })
      })

      it("Updates a tech translation", function () {
        return api
          .put(url("techs", tech.id) + "/translations/pt")
          .send({ tech: random.tech() })
          .set("Authorization", authorization)
          .expect(200).endAsync()
          .then(Test.returnModel)
          .then(Test.haveOnlyModelProperties)
      })

      it("Denies unauthenticated update tech translation", function () {
        return api
          .put(url("techs", tech.id) + "/translations/pt")
          .send({ tech: random.tech() })
          .expect(401).endAsync()
      })
    })
  })

  describe("DELETE /techs/:tech_id", function () {
    var tech
    before(function () {
      return api
        .post(url("techs")).send({ tech: random.tech() })
        .set("Authorization", authorization)
        .expect(201).endAsync()
        .then(function (res) { tech = res.body.tech })
    })

    it("Delete a tech", function () {
      return api
        .delete(url("techs", tech.id))
        .set("Authorization", authorization)
        .expect(204).endAsync()
        .then(Test.responseEmpty)
    })

    it("Denies tech delete", function () {
      return api
        .delete(url("techs", tech.id))
        .expect(401).endAsync()
    })
  })
})
