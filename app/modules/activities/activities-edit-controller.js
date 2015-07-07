angular.module('tracker').controller('ActivitiesEditController', function(Activity, $scope, $state){


  var activityId = $scope.activityId;	// passed by parent abstract controller (ui-router)
  $scope.activity = Activity.read(activityId);


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
    // TODO: Be more elegant with modal dialogs (use angular-ui bootstrap dialogs).
    // Since we use a fade animation to dismiss the modal,
    // we need to wait for the animation to end to change state.
    // Otherwise, we end up on a new state with the modal gone
    // but the screen still shielded.
		$('#confirmDeleteActivityModal').modal('hide').on('hidden.bs.modal', function (e) {
      // Unbind again to prevent multiple events in the future.
      // A global bin is not desired, since 'cancel' should not invoke this method!
      $(this).off('hidden.bs.modal');
      Activity.delete(activityId);
      $state.go('activities');
    });
	};


	/** User wants to edit a certain field */
	$scope.uiEditField = function(fieldName) {
		console.debug('[UI] edit field %s', fieldName);
	};


	// --------------------
	// Private Methods
	// --------------------
	var addField = function() {
		console.debug('addField %o', $scope.fieldName);
		// Check fieldName
		if (!$scope.fieldName || $scope.fieldName.length < 1) return;
		if ($scope.activity.records.length > 0) return;

		// Create new field
		Activity.createField(activityId, $scope.fieldName)
	};



});
