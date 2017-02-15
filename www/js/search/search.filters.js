angular.module('your_app_name.search.filters', [])

.filter('searchField', function ($parse) {

  /**
   * @description
   * get an object and return array of values
   * @param object
   * @returns {Array}
   */
  function toArray(object) {
    return angular.isArray(object) ? object : Object.keys(object).map(function(key) {
        return object[key];
      });
  }

  return function (collection) {
    var get, field;

    collection = (angular.isObject(collection)) ? toArray(collection) : collection;

    var args = Array.prototype.slice.call(arguments, 1);

    if(!angular.isArray(collection) || !args.length) {
      return collection;
    }

    return collection.map(function(member) {

      field = args.map(function(field) {
        get = $parse(field);
        return get(member);
      }).join(' ');

      return angular.extend(member, { searchField: field });
    });
  };
})
;
