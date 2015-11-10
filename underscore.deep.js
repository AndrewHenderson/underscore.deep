// Underscore-deep (underscore.deep.js 1.0.0)
// (c) 2015 Andrew Henderson
// Underscore-deep may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `require` it on the server.
  if (typeof exports === 'object') {
    _ = module.exports = require('underscore');
  }

  // Mixing in the deep methods along with "hasEqual"
  // ------------------------------------------------

  _.mixin({

    // Compares two objects to see if all key/value pairs are equal.
    hasEqual: function (a, b, keys) {
      if (_.isUndefined(keys)) {
        keys = _.keys(b);
      }
      a = _.pick(a, keys);
      b = _.pick(b, keys);
      return _.isEqual(a, b);
    },

    // Recursive version of `find`:
    // Return the first value which passes a truth test at any depth of the collection.
    deepFind: function(obj, predicate, context) {
      var result;
      predicate = _.iteratee(predicate, context);

      if (predicate(obj)) {
        return obj;
      }

      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          if (_.isArray(obj[i])) {
            _.each(obj[i], function(_obj) {
              if (result) {
                return;
              }
              result = _.deepFind(_obj, predicate);
            });
          } else if (_.isObject(obj[i])) {
            result = _.deepFind(obj[i], predicate);
          } else {
            if (predicate(obj[i])) {
              result = obj[i];
            }
          }
          if (result) {
            return result;
          }
        }
      }
    },

    // Recursive version of `filter`:
    // Return all the elements that pass a truth test at any depth of the collection.
    deepFilter: function(obj, predicate, context) {
      var results = [];
      predicate = _.iteratee(predicate, context);

      if (predicate(obj)) {
        results.push(obj);
      }

      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          if (_.isArray(obj[i])) {
            _.each(obj[i], function(_obj) {
              var result = _.deepFilter(_obj, predicate);
              if (result) {
                results.push(result);
              }
            });
          } else if (_.isObject(obj[i])) {
            var result = _.deepFilter(obj[i], predicate);
            if (result) {
              results.push(result);
            }
          } else {
            if (predicate(obj[i])) {
              results.push(obj[i]);
            }
          }
        }
      }
      if (results.length) {
        return _.flatten(results, true);
      }
    },

    // Recursive version of `where`: selecting only objects
    // containing specific `key:value` pairs at any depth of the collection.
    deepWhere: function(obj, attrs) {
      var results = [];

      if (_.hasEqual(obj, attrs)) {
        results.push(obj);
      }

      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          if (_.isArray(obj[i])) {
            _.each(obj[i], function(_obj) {
              var result = _.deepWhere(_obj, attrs);
              if (result) {
                results.push(result);
              }
            });
          } else if (_.isObject(obj[i])) {
            var result = _.deepWhere(obj[i], attrs);
            if (result) {
              results.push(result);
            }
          }
        }
      }
      if (results.length) {
        return _.flatten(results, true);
      }
    },

    // Recursive version of `findWhere`: getting the first object
    // containing specific `key:value` pairs at any depth of the collection.
    deepFindWhere: function(obj, attrs) {
      var result;

      if (_.hasEqual(obj, attrs)) {
        return obj;
      }

      for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
          if (_.isArray(obj[i])) {
            _.each(obj[i], function(_obj) {
              if (result) {
                return;
              }
              result = _.deepFindWhere(_obj, attrs);
            });
          } else if (_.isObject(obj[i])) {
            result = _.deepFindWhere(obj[i], attrs);
          }
          if (result) {
            return result;
          }
        }
      }
    },

    deepHasEqual: function(a, b, keys) {
      var result;

      if (_.isUndefined(keys)) {
        keys = _.keys(b);
      }
      a = _.pick(a, keys);
      b = _.pick(b, keys);

      if ( _.hasEqual(a, b, keys)) {
        return true;
      }

      for (var i in a) {
        if (a.hasOwnProperty(i)) {
          if (_.isArray(a[i])) {
            _.each(a[i], function(obj) {
              if(result){
                return;
              }
              result = _.deepHasEqual(obj, b, keys);
            });
          } else if (_.isObject(a[i])) {
            result = _.deepHasEqual(a[i], b, keys);
          }
        }
      }
      return !!result;
    },

    deepSearch: function(collection, values) {
      var results = [];
      _.deepFilter(collection, function(obj) {
        var status = true;
        for(var i in values) {
          if (!status) {
            return;
          }
          status = _.contains(obj, values[i]);
        }
        if(status) {
          results.push(obj);
        }
      });
      if (results.length) {
        return results;
      }
    }
  });

}).call(this);
