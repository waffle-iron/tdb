"use strict"

module.exports = {
  type: "Deck",
  schema: {
    name: { type: String, required: true, trim: true }
  },
  relationships: {
    owner: {
      model: "User",
      type: "belongs_to"
    }
  }
}
