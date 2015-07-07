angular.module('form').controller('FormFieldEditController', function($scope, $stateParams, Activity) {

	$scope.fieldName = $stateParams.fieldName;
	$scope.activity = Activity.read($scope.activityId);

	$scope.uiDeleteField = function() {
		//TODO: Implement "Delete field"
		console.warn('"Delete field" not yet implemented');
	};



});