"use strict"

var hashPassword = require("../libs/password").hashPassword

function setPasswordHash (user, cb) {
  var password = user.password
  delete user.password

  if (!password) return cb(null, user)

  hashPassword(password, function (err, hashed) {
    if (err) return cb(err)
    user.hashedPassword = hashed
    cb(null, user)
  })
}

module.exports = {
  type: "User",
  schema: {
    email: { type: String, required: true},
    hashedPassword: { type: String }
  },
  useTimestamps: true,
  uniqueFields: { email: false },
  prepares: [ setPasswordHash ],
  relationships: {
    tokens: {
      model: "Token",
      type: "has_token",
      opts: {
        many: true,
        orderBy: {property: "created", desc: true}
      }
    }
  }
}
