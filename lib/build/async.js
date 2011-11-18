exports.createTask = function(reporter) {
	return function asyncTask(name, prerequisites, action) {
		if (typeof action === 'undefined') {
			action = prerequisites;
			prerequisites = [];
		}

		task(name, prerequisites, function() {
			function callback(result) {
				reporter(result);
			}

			action(callback);
		}, true);
	};
}