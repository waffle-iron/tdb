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
  },
  image: function () {
    return this.url({ extensions: ["jpg", "png"] })
  },
  question: function () {
    return this.natural({ min: 1, max: 5})
  },
  tech: function () {
    return {
      name: this.sentence({ words: 3 }),
      summary: this.sentence(),
      description: this.paragraph(),
      thumbnail: this.image(),
      picture: this.image(),
      question0: this.question(),
      question1: this.question(),
      question2: this.question(),
      question3: this.question(),
      question4: this.question(),
      question5: this.question(),
      question6: this.question(),
      question7: this.question(),
      question8: this.question(),
      question9: this.question()
    }
  }
})

module.exports = chance;
