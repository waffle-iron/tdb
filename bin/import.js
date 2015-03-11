"use strict"

var db = require("../libs/db")
var fs = require("fs")
var parse = require("csv-parse")
var slug = require("slug")
var transform = require("stream-transform")
var path = require("path")


var csvFile = path.resolve(process.cwd(), process.argv[2])
var input = fs.createReadStream(csvFile)

var parser = parse({ trim: true })
var transformer = transform(function (record, cb) {
  if (record[1] === "tech") return cb(null)

  var node = {
    name: record[1],
    slug: slug(record[1].toLowerCase()),
    description: record[3]
  }

  db.insertNodeAsync(node, "Tech")
    .then(function (node) {
      cb(null, "Inserted " + node.name + "\n")
    })
    .catch(function (err) {
      return cb(err)
    })
}, { parallel: 10 })

input.pipe(parser).pipe(transformer).pipe(process.stdout)
