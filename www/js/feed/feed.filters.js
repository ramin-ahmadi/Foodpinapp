angular.module('your_app_name.feed.filters', [])

.filter('cleanStateClass', function () {
  return function (input) {
    return input.replace(/\./g, '-');
  };
})

.filter('floor', function() {
  return function(input) {
    return Math.floor(input);
  };
})

;
