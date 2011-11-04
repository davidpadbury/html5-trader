define(function() {
	
	var socket = io.connect();
	
	function StockDataService(options) {
		var bus = options.bus;
		
		// Wire up stock data event
		bus.sub('get-stock-data', function(callback) {
			socket.emit('get-stocks', function(data) {
				callback(data);
			});
		});
		
		bus.sub('get-news-articles', function(data, callback) {
			socket.emit('get-news-articles', data, callback);
		});
		
		// Push any ticks in
		socket.on('symbol-updated', function(data) {
			bus.pub('symbol-updated', data);
		});
	}
	
	return StockDataService;
});