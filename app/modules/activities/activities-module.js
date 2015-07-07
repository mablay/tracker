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
    .state('activity', {
      abstract: true,
      url: "/:id",
      controller: function($scope, $stateParams) {
        console.debug('StateParams %o', $stateParams);
        $scope.activityId = $stateParams.id;
      },
      template: '<ui-view/>'
    })
    .state('activity.view', {
      url: "/view",
      templateUrl: "modules/activities/activities-view.html",
    })
    .state('activity.edit', {
      url: "/edit",
      templateUrl: "modules/activities/activities-edit.html"
    })
    .state('activity.field', {
      url: "/schema/:fieldName",
      templateUrl: "modules/form/form-field-edit.html"
    })
    .state('activity.record', {
      url: "/record",
      templateUrl: "modules/activities/activities-record.html"
    });
});
