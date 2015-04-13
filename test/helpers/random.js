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
      image: this.image(),
      impactBanking: this.question(),
      impactEducation: this.question(),
      impactEntertainment: this.question(),
      impactFood: this.question(),
      impactHousing: this.question(),
      impactMedia: this.question(),
      impactMobile: this.question(),
      impactPolicy: this.question(),
      impactRetail: this.question(),
      impactRobotics: this.question(),
      impactSustainability: this.question(),
      impactTransportation: this.question(),
      impactTravel: this.question(),
      impactWellbeing: this.question(),
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
  },
  startup: function () {
    return {
      name: this.sentence({ words: 3 }),
      summary: this.sentence(),
      image: this.image(),
      websiteUrl: this.url(),
      twitterUrl: this.url(),
      crunchbaseUrl: this.url(),
      angelUrl: this.url()
    }
  },
  link: function () {
    return {
      title: this.sentence({ words: 6 }),
      url: this.url()
    }
  }
})

module.exports = chance;
