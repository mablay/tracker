angular.module('tracker').controller('ActivitiesController', function(Activity, $scope, $localStorage, $state){

  var activityId = $scope.activityId;	// passed by parent abstract controller (ui-router)
	$scope.$storage = $localStorage;
	$scope.$storage.activities = $scope.$storage.activities || {};
  $scope.activity = $localStorage.activities[activityId];

  //--------------
  // UI Actions
  //--------------

  /**
   * Is called when the user enters something in the search bar and
   * presses the return key or clicks the "+" button.
   * If the activity entered exists, the behavior is to select it.
   * If the activity does not exist, the behavior is to create it.
   */
	$scope.uiActivity = function() {
		console.debug('Searching for activity %s', $scope.searchActivity);

		var name = $scope.searchActivity;
		if (!name || name.length < 1) return;

		var activities = Object.keys($scope.$storage.activities);
		console.debug('Activities in the list %o', activities);

		// Create / Select
		if (!$scope.$storage.activities.hasOwnProperty(name)) {
      createActivity(name);
    } else {
      selectActivity(name)
		}

		console.debug('ACTIVITIES %o', $scope.$storage.activities);
	};

	$scope.uiActivityInputKeyPress = function(event) {
		if (event.keyCode == 13) {
			$scope.uiActivity();
		}
	};


  $scope.uiSelectActivity = function(id) {
    goToActivityWithId(id);
  };



  //----------------
  // Private Methods
  //----------------


  var createActivity = function(name) {
    console.log('Creating new activity %s', name);
    var hash = Activity.hash(name);
    $scope.$storage.activities[hash] = Activity.create(name);
  };

  var goToActivityWithId = function(id) {
    var activity = $scope.$storage.activities[id]
    console.debug('User selected activity %s', activity.title);
    $state.go('activity.view', {id: id});
  };

});
