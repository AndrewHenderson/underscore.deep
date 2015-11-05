    // Underscore.deep (underscore.deep.js 1.0.0)
    // (c) 2015 Andrew Henderson
    // Underscore.deep may be freely distributed under the MIT license.

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
        hasEqual: function(obj1, obj2, keys) {
          if (_.isUndefined(keys)) {
            keys = _.keys(obj2);
          }
          var _obj1 = _.pick(obj1, keys);
          var _obj2 = _.pick(obj2, keys);
          return _.isEqual(_obj1, _obj2);
        },

        // Recursively looks through each value in the list, returning an array
        // of all the objects that contain all of the key-value pairs listed in properties.
        deepWhere: function(obj, attrs) {
          var results = [];

          if (_.hasEqual(obj, attrs)) {
            return obj;
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
            return _.flatten(results, 'shallow');
          }
        },

        // Recursively looks through the list and returns the first value
        // that matches all of the key-value pairs listed in properties.
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
        }
      });

    }).call(this);
