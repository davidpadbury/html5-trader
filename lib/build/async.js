function asyncTask(name, prerequisites, action) {
	if (typeof action === 'undefined') {
		action = prerequisites;
		prerequisites = [];
	}
	
	task(name, prerequisites, function() {
		function callback(err, result) {
			if (err) {
				fail(err);
			} else {
				complete(result);
			}
		}
		
		action(callback);
	});
}

exports.asyncTask = asyncTask;