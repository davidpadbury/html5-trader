describe('addWatchView', function() {
	var AddWatchView, host, instance;
	
	jasmine.require(['StockTrader/Watch/AddWatch/addWatchView'], function(module) {
		AddWatchView = module;
		
		host = $('<div>');
		setFixtures(host);
		
		instance = new AddWatchView({
			el: host
		});
	});
});