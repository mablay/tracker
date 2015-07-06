angular.module('tracker').filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  };
});
