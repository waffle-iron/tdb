"use strict"

var Promise = require("bluebird")
var request = require("supertest")
var should = require("should")

var server = require("../server")
var url = require("./helpers/url")
var random = require("./helpers/random")

Promise.promisifyAll(request.Test.prototype)

describe("/api/v2/users resource", function () {
  before(function () {
    this.api = request(server)
  })

  describe("POST /users", function () {
    it("Creates user", function () {
      return this.api
        .post(url("users")).send({ user: random.user() })
        .expect(201).endAsync()
        .then(function testResponse (res) {
          var json = res.body
          should.exist(json.user)
          json.user.should.have.properties("id", "email", "tokens")
          json.user.tokens.should.not.be.empty
          json.user.tokens.should.not.have.properties("password")
        })
    })
  })
})
