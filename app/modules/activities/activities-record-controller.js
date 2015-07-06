angular.module('tracker').controller('RecordController', function ($scope, Activity, $state) {
	
	console.debug('[recordController] init for Activity %o', $scope.activityId);

	$scope.activity = Activity.read($scope.activityId);

	var schema = $scope.activity.schema;

	// key means "property" or "record field name", its an activity.schema property.
	var schemaKeys = Object.keys(schema);

	$scope.record = {};

	// Split field list into visible fields and invisible fields
	for (var i = schemaKeys.length - 1; i >= 0; i--) {
		var key = schemaKeys[i];
		var fieldData = "";

		if (schema[key].default) {
			// Quick and dirty: This should be done with a behavior driven evaluation pattern
			if (schema[key].type == "timestamp") {
				if (schema[key].default == "NOW") {
					fieldData = Date.now();
				}
			}
		}
		
		$scope.record[key] = fieldData;
	};

	$scope.uiCreateRecord = function() {
		console.debug('User creates record %o', $scope.record);
		Activity.record($scope.activityId, $scope.record);
		$state.go('activity.view', {id: $scope.activityId});
	};

})