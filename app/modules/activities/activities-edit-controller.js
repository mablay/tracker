angular.module('tracker').controller('ActivitiesEditController', function($scope, $localStorage, $state){
  
  	var activityId = $scope.activityId;	// passed by parent abstract controller (ui-router)
	$scope.$storage = $localStorage;


	$scope.init = function() {
		console.debug('Init edit activity with id %s', activityId);
	};

	$scope.uiFieldNameInputKeyPress = function(event) {
		if (event.keyCode == 13) { addField(); }
	};
	$scope.uiAddField = function() {
		addField();
	};

	var addField = function() {
		console.debug('addField %o', $scope.fieldName);
		// Check fieldName
		if (!$scope.fieldName || $scope.fieldName.length < 1) return;

	};


});
