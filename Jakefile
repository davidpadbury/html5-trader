var asyncTask = require('./lib/build/async').asyncTask,
	exec = require('child_process').exec;

desc('Run jshint against client side codebase.');
asyncTask('jshint', function(callback) {
	var cmd = 'jshint public/scripts/stockTrader/**/*.js --config config/jshint.json';
	exec(cmd, function(err, stdout, stderr) {
		if (err) {
			console.error(stdout);
			callback('JsHint on the client codebase failed.');
		} else {
			callback(null);
		}
	});
});