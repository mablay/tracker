angular.module('tracker').controller('ActivitiesController', function(Activity, $scope, $state){

  $scope.initActivityList = function() {
    $scope.activities = Activity.list();
  };

  $scope.initActivityView = function () {
    // The $scope.actitityId value is resolved in the router
    $scope.activity = Activity.read($scope.activityId);
  };


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
    var name = $scope.searchActivity;
		if (!name || name.length < 1) return;
    console.debug('Searching for activity %s', name);

		// Create / Select
    var activityId = Activity.hash(name);
    var resolvedActivity = Activity.read(activityId);
		if (resolvedActivity) {
      goToActivityWithId(activityId);
    } else {
      Activity.create(name);
      $scope.initActivityList();
		}

	};

	$scope.uiActivityInputKeyPress = function(event) {
		if (event.keyCode == 13) {
			$scope.uiActivity();
		}
	};


  /**
   * Called when user selects an activit from the list of activities.
   * @param id The activityId
   */
  $scope.uiSelectActivity = function(id) {
    goToActivityWithId(id);
  };



  //----------------
  // Private Methods
  //----------------


  var goToActivityWithId = function(id) {
    console.debug('User selected activity %s', $scope.activities[id].title);
    $state.go('activity.view', {id: id});
  };

});
