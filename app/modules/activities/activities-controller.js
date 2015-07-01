angular.module('tracker').controller('ActivitiesController', function($scope, $localStorage, $state){
  
	$scope.$storage = $localStorage;
	$scope.$storage.activities = $scope.$storage.activities || {};

	$scope.uiActivity = function() {
		console.debug('Searching for activity %s', $scope.searchActivity);

		var searchActivity = $scope.searchActivity;
		if (!searchActivity || searchActivity.length < 1) return;

		var activities = Object.keys($scope.$storage.activities);
		console.debug('Activities in the list %o', activities);

		// Create / Select
		if (!$scope.$storage.activities.hasOwnProperty(searchActivity)) {
			console.log('Creating new activity %s', searchActivity);
			var hash = XXH( searchActivity, 0xABCD ).toString(32)  // seed = 0xABCD
			$scope.$storage.activities[hash] = {'title': searchActivity};
		} else {
			console.debug('User selected activity %s', searchActivity);
		}

		console.debug('ACTIVITIES %o', $scope.$storage.activities);
	};

	$scope.uiActivityInputKeyPress = function(event) {
		if (event.keyCode == 13) {
			$scope.uiActivity();
		}
	};


	$scope.uiSelectActivity = function(id) {
		var activity = $scope.$storage.activities[id]
		console.debug('User selected activity %s', activity.title);
    	$state.go('activity.view', {id: id});
	};

});
