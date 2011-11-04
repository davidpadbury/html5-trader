require(
	['modules', 'Shell/shell', 'Infrastructure/pubsub', 'Infrastructure/stockDataService'], 
	function (modules, Shell, PubSub, StockDataService) {
	
		var container = $('#container'),
			bus = new PubSub(),
			stockDataService = new StockDataService({ bus: bus }),
			shell = new Shell({
				bus: bus,
				container: container,
				modules: modules
			});
			
});
