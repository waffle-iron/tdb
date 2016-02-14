SimpleSchema.extendOptions({
  esDriver: Match.Optional(Boolean)
});
getModifierFields = function(modifier) {
  // compute modified fields
  let fields = [];
  _.each(modifier, function(params, op) {
    if (_.contains(['$set', '$unset', '$inc', '$push', '$pull', '$pop',
     '$rename', '$pullAll', '$addToSet', '$bit'], op)) {
      _.each(_.keys(params), function(field) {
        if (!_.contains(fields, field)) {
          fields.push(field);
        }
      });
    } else {
      fields.push(op);
    }
  });

  return fields;
};


Mongo.Collection.prototype.riverable = function(esConn, index, type) {
  this.es = {};
  this.es.conn = esConn;
  this.es.index = index;
  this.es.type = type;
  //
  //  check if there is an attached SimpleSchema instance
  //
  if (!this.simpleSchema()) {
    throw new Error('Riverable needs an attached SimpleSchema instance.');
  }

  //
  //  grab collection simpleSchema instance
  //
  let schema = this.simpleSchema().schema();
  this.es.keys = [];
  //
  //  grab keys that have esDriver: true
  //
  for (let key in schema) {
    if (schema[key].esDriver) {
      this.es.keys.push(key);
      if (_.isArray(schema[key].type())) {
        this.es.keys.push(`${key}.$`);
      }
    }
  }

  //
  //  create a new schema from them
  //
  this.es.schema = this.simpleSchema().pick(this.es.keys);

  //
  //  "insert" hooks
  //
  this.after.insert((userId, doc) => {
    let cleanedDoc = _.clone(doc);
    this.es.schema.clean(cleanedDoc);

    if (cleanedDoc) {
      try {
        this.es.conn.index({
          index: this.es.index,
          type: this.es.type,
          id: doc._id,
          body: cleanedDoc
        });
      } catch (e) {
        console.error('ElasticSearchAdapter error at insert:');
        console.error(e.message);
      }
    }
  });

  //
  //  "update" hook
  //
  this.after.update((userId, doc, fieldNames, modifier) => {
    let modifiedKeys = getModifierFields(modifier);

    //
    //  are the modified fields being tracked ?
    //
    if (_.intersection(modifiedKeys, this.es.keys).length) {
      let cleanedDoc = _.clone(doc);
      this.es.schema.clean(cleanedDoc);
      delete cleanedDoc._id;  //  we will never update the _id
      if (cleanedDoc) {
        try {
          return this.es.conn.update({
            index: this.es.index,
            type: this.es.type,
            id: doc._id,
            body: {
              doc: cleanedDoc
            }
          });
        } catch (e) {
          console.error('ElasticSearchAdapter error at update:');
          console.error(e.message);
        }
      }
    }
  });

  //
  //  "remove" hook
  //
  this.after.remove((userId, doc) => {
    try {
      return this.es.conn.delete({
        index: this.es.index,
        type: this.es.type,
        id: doc._id
      });
    } catch (e) {
      console.error('ElasticSearchAdapter error at remove:');
      console.error(e.message);
    }
  });
};
