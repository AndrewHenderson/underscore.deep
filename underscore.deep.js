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

      if (_.isFunction(predicate)) {
        predicate = _.iteratee(predicate, context);
        if (predicate(obj)) {
          return obj;
        }
      } else if (_.hasEqual(obj, predicate)) {
        return obj;
      }

      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (_.isArray(obj[prop])) {
            _.each(obj[prop], function(_obj) {
              if (result) {
                return;
              }
              result = _.deepFind(_obj, predicate);
            });
          } else if (_.isObject(obj[prop])) {
            result = _.deepFind(obj[prop], predicate);
          } else {
            if (_.isFunction(predicate) && predicate(obj[prop])) {
              result = obj[prop];
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
      if (_.isFunction(predicate)) {
        predicate = _.iteratee(predicate, context);
        if (predicate(obj)) {
          results.push(obj);
        }
      } else if (_.hasEqual(obj, predicate)) {
        results.push(obj);
      }

      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          if (_.isArray(obj[prop])) {
            _.each(obj[prop], function(_obj) {
              var result = _.deepFilter(_obj, predicate);
              if (result) {
                results.push(result);
              }
            });
          } else if (_.isObject(obj[prop])) {
            var result = _.deepFilter(obj[prop], predicate);
            if (result) {
              results.push(result);
            }
          } else {
            if (_.isFunction(predicate) && predicate(obj[prop])) {
              results.push(obj[prop]);
            }
          }
        }
      }
      if (results.length) {
        return _.flatten(results, true);
      }
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
