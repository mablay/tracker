angular.module('tracker').config(function($stateProvider, $urlRouterProvider) {
  //
  // For any unmatched url, redirect to /state1
  $urlRouterProvider.otherwise("/");
  //
  // Now set up the states
  $stateProvider
    .state('activities', {
      url: "/",
      templateUrl: "modules/activities/activities-list.html",
      controller: function($scope) {
      	console.debug('Activity Ctrl');
      }
    })
    .state('activity:id', {
      url: "/:id",
      templateUrl: "modules/activities/activity-view.html",
      controller: function($scope) {
        $scope.items = ["A", "List", "Of", "Items"];
      }
    });
});
