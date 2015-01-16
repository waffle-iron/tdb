"use strict"

var _ = require("lodash")
var Promise = require("bluebird")
var request = require("supertest")
require("should")

var server = require("../server")
var url = require("./helpers/url")
var random = require("./helpers/random")

Promise.promisifyAll(request.Test.prototype)

describe("/api/v2/tokens resource", function () {
  before(function () {
    this.api = request(server)
    this.tokenURL = url("tokens")
    this.user = random.user()
    return this.api.post(url("users")).send({ user: this.user }).endAsync()
  })

  it("Authenticates user with correct parameters", function () {
    return this.api
      .post(this.tokenURL)
      .send(this.user)
      .expect(201).endAsync()
      .then(function testResponse (res) {
        var json = res.body
        json.should.have.properties("accessToken", "user")
      })
  })

  it("Denies authentication with wrong password", function () {
    var wrongCredentials = _.clone(this.user)
    wrongCredentials.password = "xyz" + wrongCredentials.password
    return this.api
      .post(this.tokenURL)
      .send(wrongCredentials)
      .expect(400).endAsync()
      .then(function testResponse (res) {
        var json = res.body
        json.should.have.properties("errors")
      })
  })

  it("Denies authentication with wrong email", function () {
    var wrongCredentials = _.clone(this.user)
    wrongCredentials.email = "xyz" + wrongCredentials.email
    return this.api
      .post(this.tokenURL)
      .send(wrongCredentials)
      .expect(400).endAsync()
      .then(function testResponse (res) {
        var json = res.body
        json.should.have.properties("errors")
      })
  })
})
