"use strict"

var bcrypt = require("bcryptjs")

exports.hashPassword = function hashPassword (password, cb) {
  bcrypt.hash(password, 10, function (err, hashed) {
    if (err) return cb(err)
    cb(null, hashed)
  })
}

exports.testPassword = function testPassword (hash, password) {
  return bcrypt.compareSync(password, hash)
}
