angular.module('tracker').controller('ActivitiesEditController', function($scope, $localStorage, $state){
  

	$scope.$storage = $localStorage;
  	var activityId = $scope.activityId;	// passed by parent abstract controller (ui-router)

  	// shorthand structure - make sure to serialize it after modification!
  	$scope.structure = $localStorage.activities[activityId].structure || {};


	// --------------------
	// UI Actions
	// --------------------
	$scope.uiFieldNameInputKeyPress = function(event) {
		if (event.keyCode == 13) { addField(); }
	};
	$scope.uiAddField = function() {
		addField();
	};
	$scope.uiDeleteActivity = function() {
		console.debug('User: Delete activity %s', activityId);
	};


	// --------------------
	// Private Methods
	// --------------------
	var addField = function() {
		console.debug('addField %o', $scope.fieldName);
		// Check fieldName
		if (!$scope.fieldName || $scope.fieldName.length < 1) return;
		if ($scope.structure) return;

		// Create new field

	};


});
