var watch = require('watch'),
	exec = require('child_process').exec,
	growl = require('growl'),
	requirejs = require('requirejs'),
	isInteractive = false,
	reporter = function(result) {
		if (isInteractive) {
			growl.notify(result.message || '', {
				title: result.title,
				image: './config/images/' + result.type + '.jpg'
			});
		} else {
			if (result.type === 'error') {
				fail();
			} else {
				complete();
			}
		}
	},
	asyncTask = require('./lib/build/async').createTask(reporter);

desc('Run jshint against client side codebase.');
asyncTask('jshint', function(callback) {
	var cmd = 'jshint public/scripts/stockTrader --config config/jshint.json';
	exec(cmd, function(err, stdout, stderr) {
		var message;
		
		if (err) {
			// strip full filename
			message = stdout.replace(/^(.+)\.js:/gm, function(m, path) {
					return path.slice(path.lastIndexOf('/') + 1) + '.js';
				}).replace(/, col \d+, /g, ': ');
				
			callback({
				type: 'error',
				title: 'JsHint Failed',
				message: message
			});
		} else {
			message = 'JsHint passed';
			callback({
				type: 'info',
				title: 'JsHint Passed'
			});
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
		callback(e);
	}
});

desc('Watch filesystem and invoke relevant tasks when files change.');
asyncTask('watch', function(callback) {
	isInteractive = true;
	watch.createMonitor('./public/scripts/stockTrader', function(monitor) {
		var jsRegExp = /\.js$/i;
		
		function changed(f, stat) {
			if (!f.match(jsRegExp)) {
				return;
			}
			
			jake.Task['jshint'].execute();
		}
		
		monitor.on('changed', changed);
		monitor.on('created', changed);
	});
});