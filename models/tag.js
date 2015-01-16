"use strict"

module.exports = {
  type: "Tag",
  schema: {
    name: { type: String, required: true, trim: true }
  },
  uniqueFields: { name: true },
}
