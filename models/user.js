"use strict"

var bcrypt = require("bcrypt")

function hashPassword (user, cb) {
  var password = user.password
  delete user.password

  if (!password) return cb(null, user)

  bcrypt.hash(password, 10, function (err, hashed) {
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
  prepares: [ hashPassword ],
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
