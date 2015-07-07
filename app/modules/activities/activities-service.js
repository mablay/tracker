angular.module('tracker').service('Activity', function($localStorage) {

  //var service;

  return {
    /**
     * A simple hash algorithm is used to calculate the id.
     * This is done to prevent incremental counting of ids and
     * making it hard to guess id names.
     * @param name String
     * @return the hashed name (not quite 100% unique!)
     */
    hash: function(name) {
      var hash = XXH(name, 0xABCD).toString(32)  // seed = 0xABCD
      console.log('xxHash(%s) => %s', name, hash);
      return hash;
    },

    /**
     * returns a list of abbreviated activities
     * @returns {activityId: {title:'title'}}
     */
    list: function() {
      var activities = {};
      var hashes = Object.keys($localStorage.activities);
      for (var i=0; i<hashes.length; i++) {
        activities[hashes[i]] = {
          title: $localStorage.activities[hashes[i]].title
        }
      }
      console.debug('Activity.list() returns %o', activities);
      return activities;
    },

    /**
     * Reads an activity from local storage based on its ID.
     * @returns activity OR null if none was found
     */
    read: function(activityId) {
      if ($localStorage.activities.hasOwnProperty(activityId)) {
        return $localStorage.activities[activityId];
      }
      return null;
    },

    /**
     * Reads an activity from local storage based on its name.
     * @returns activity OR null if none was found
     * @see read
     */
    readByName: function (activityName) {
      return this.read(this.hash(activityName));
    },

    /**
     * Creates and returns a new activity
     * @returns activity
     */
    create: function(activityName) {
      var activityId = this.hash(activityName)
      var activity = {
        id: activityId,
        title: activityName,
        schema: {
          timestamp: {
            label: "Time",
            type: "timestamp",
            default: "NOW",
            visible: false
          }
        },
        records: []
      };
      $localStorage.activities[activityId] = activity;
      return activity;
    },
    /**
     * Update an activity by appending a single record
     */
    record: function(activityId, record) {
      if (!record) {
        console.warn('Record insertion failed! Record must correspond to its schema');
      }
      if (!$localStorage.activities[activityId]) {
        console.warn('Record insertion failed! Activity %s could not be resolved.', activityId);
        return;
      }
      $localStorage.activities[activityId].records.push(record);
    },
    delete: function(activityId) {
      console.debug('[ACTIVITY] DELETE %s', activityId);
      delete $localStorage.activities[activityId];
    },

    /** Schema related methods */

    listFields: function(activityId) {
      var activity = this.read(activityId);
      if (!activity) return [];
      return Object.keys(activity.schema);
    },
    createField: function(activityId, fieldName, options) {
      options = options || {};
      if (!$localStorage.activities[activityId]) {
        console.warn('Invalid activityId');
        return;
      }
      if ($localStorage.activities[activityId].schema[fieldName]) {
        console.warn('Field name already exists');
        return;
      }
      var field = $.extend({
        label: "field",
        type: "string",
        default: undefined,
        visible: true
      }, options);
      // TODO: validate field

      // Store field
      $localStorage.activities[activityId].schema[fieldName] = field;
    }
  };
});
