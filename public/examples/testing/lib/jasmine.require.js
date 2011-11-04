(function(jasmine) {
	
	jasmine.require = function(modules, callback) {
		var loaded = false;
		
		beforeEach(function() {
			require(modules, function() {
				var results = Array.prototype.slice.call(arguments, 0);
		
				callback.apply(null, results);
		
				loaded = true;
			});
	
			waitsFor(function() {
				return loaded;
			});
		});
	};
	
})(window.jasmine);