(function(jasmine) {
	var slice = Array.prototype.slice;
	
	jasmine.require = function(modules, callback) {
		beforeEach(function() {
			var loaded = false;
			
			window.require(modules, function() {
				var instances = slice.call(arguments, 0);
			
				callback.apply(null, instances);
				
				loaded = true;
			});
			
			waitsFor(function() {
				return loaded;
			});
		});
	};
	
})(jasmine);