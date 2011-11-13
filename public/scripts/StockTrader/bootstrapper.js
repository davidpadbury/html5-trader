require(
	['modules', 'shell/shell', 'infrastructure/pubsub', 'infrastructure/stockDataService'], 
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
