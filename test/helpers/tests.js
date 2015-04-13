"use strict"

var _ = require("lodash")
var should = require("should")

module.exports = function (modelName, props) {
  var modelPlural = `${modelName}s`

  return {
    returnModel: function (res) {
      should.exist(res.body[modelName])
      return res
    },
    returnModels: function (res) {
      should.exist(res.body[modelPlural])
      res.body[modelPlural].should.not.be.empty
      return res
    },
    haveOnlyModelProperties: function (res) {
      var model = res.body[modelName]
      model.should.have.properties(props)
      _.keys(model).should.have.lengthOf(props.length)
      return res
    },
    isPaginated: function (qty) {
      return function (res) {
        var models = res.body[modelPlural]
        models.should.be.an.Array.and.have.lengthOf(qty)
        should.exist(res.body.meta)
        res.body.meta.total.should.be.a.Number
        return res
      }
    },
    haveMatchingProperties: function (props) {
      return function (res) {
        _.each(props, function (val, prop) {
          res.body[modelName][prop].should.equal(val)
        })
        return res
      }
    },
    responseEmpty: function (res) {
      res.body.should.be.empty
      return res
    }
  }
}
