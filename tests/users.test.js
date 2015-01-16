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
    it.skip("Returns error on user creation with repeated email", function () {
      var _this = this
      var user = random.user()
      return this.api
        .post(url("users")).send({ user: user })
        .expect(201).endAsync()
        .then(function createRepeated () {
          return _this.api
            .post(url("users")).send({ user: user })
            .expect(409).endAsync()
        })
        .then(function testResponse (res) {
          var json = res.body
          should.exist(json.errors.email)
          json.errors.email.should.be.an.Array
          json.errors.email.should.not.be.empty
          json.errors.email[0].should.match(/email must be unique/)
        })
    })
  })
})
