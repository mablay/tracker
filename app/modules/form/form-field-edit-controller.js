angular.module('form').controller('FormFieldEditController', function($scope, $stateParams, Activity, $state) {

	$scope.fieldName = $stateParams.fieldName;
	$scope.activity = Activity.read($scope.activityId);
  $scope.field = $scope.activity.schema[$scope.fieldName];

  $scope.dataTypes = [
    'string',
    'number',
    'timestamp'
  ];

	$scope.uiDeleteField = function() {
		//TODO: Implement "Delete field"
		console.warn('"Delete field" not yet implemented');
	};

  $scope.uiSubmit = function() {
    // TODO: Save field model
    console.debug('serialize field schema changes => %o', $scope.dataType);

/*    var field = $scope.activity.schema[$scope.fieldName];
    field.type = $scope.dataType;
    Activity.updateField($scope.activityId, $scope.fieldName, field);
*/
    $state.go('activity.edit');
  };

});
