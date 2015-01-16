"use strict"

var Chance = require("chance")
var chance = new Chance()

var usedEmails = []

chance.mixin({
  uniqueEmail: function () {
    var email = this.email()

    if (usedEmails.indexOf(email) !== -1) return this.uniqueEmail()

    usedEmails.push(email)
    return email;
  },
  user: function () {
    return {
      email: this.uniqueEmail(),
      password: this.word({syllables: 6})
    }
  }
})

module.exports = chance;
