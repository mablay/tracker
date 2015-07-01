angular.module('tracker').service('Activity', function() {

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
     * Creates a new activity template
     * @returns activity
     */
    create: function(activityName) {
      return {
        title: activityName,
        schema: {
          timestamp: {
            type: "timestamp",
            default: "NOW",
            visible: false
          }
        },
        records: []
      };
    }
  };
});
