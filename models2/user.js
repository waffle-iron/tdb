"use strict"

var Promise = require("bluebird")
var _ = require("lodash")
var bcrypt = Promise.promisifyAll(require("bcrypt"))
var db = require(__dirname + "/../libs/db")

function User (props) {
  this._id = undefined
  this.props = _.pick(props, _.keys(User.schema))
}
User.type = "User"
User.schema = {
  email: String,
  hashedPassword: String
}

User.prototype.getLabels = function User$getLabels () {
  return [ User.type ]
}

User.prototype.save = function User$save () {
  var _this = this
  return db
    .insertNodeAsync(this.props, this.getLabels())
    .then(function (user) {
      _this._id = user._id
      return _this
    })
}

User.prototype.setPassword = function User$setPassword (password) {
  var _this = this
  return bcrypt.hashAsync(password, 10)
    .then(function (hash) {
      _this.props.hashedPassword = hash
      return _this
    })
}

User.prototype.testPassword = function User$testPassword (password) {
  return bcrypt.compareSync(password, this.props.hashedPassword)
}

module.exports = User
