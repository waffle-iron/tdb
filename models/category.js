"use strict"

module.exports = {
  type: "Category",
  schema: {
    name: { type: String, required: true, trim: true }
  },
  uniqueFields: { name: true },
}
