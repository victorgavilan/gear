/**
 * Inspects object chain.
 *
 * @param options {Object} Ignored.
 * @param objects {Array} Object chain.
 * @param logger {Object} Logger instance, if additional logging required (other than task exit status).
 * @param callback {Function} Callback on task completion.
 */
exports.inspect = {
    fn: function(options, objects, logger, callback) {
        objects.forEach(function(object) {
            logger.log(object);
        });

        callback(null, objects);
    }
};