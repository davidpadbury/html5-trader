var asyncTask = require('./lib/build/async').asyncTask,
	exec = require('child_process').exec,
	requirejs = require('requirejs');

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

desc('Run the requirejs optimizer against the stockTrader app.');
asyncTask('optimize-app', function(callback) {
	var config = {
		baseUrl: './public/scripts/stockTrader',
		name: 'bootstrapper',
		out: './public/scripts/release/stockTrader.js'
	};
	
	try {
		requirejs.optimize(config, function(response) {
			callback(null);
		});
	} catch (e) {
		fail(e);
	}
});