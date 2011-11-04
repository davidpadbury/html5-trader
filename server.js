var fs = require('fs'),
	util = require('util'),
	EventEmitter = require('events').EventEmitter,
	express = require('express'),
	stylus = require('stylus'),
	googleNewsService = require('./lib/googleNewsService'),
	stocksPath = __dirname + '/data/stocks.json',
	app = express.createServer(),
	io = require('socket.io').listen(app),
	argv = require('optimist')
		.usage('Usage: $0 -p [port] -h [host]')
		.alias('p', 'port')
		.alias('h', 'host')
		.default('port', 3001)
		.argv,
	stockData,
	stockTickers;
	
function StockDataGenerator(symbol) {
	EventEmitter.call(this);
	this.symbol = symbol;
	this.price = Math.random() * 1000;
	
	function update() {
		var change = (Math.random() * 10) - 5, // somewhere between -5-5
			nextUpdate = (Math.random() * 1000) + 600; // somewhere between 600-1600ms
			
		this.price += change;
		
		this.emit('symbol-updated', {
			symbol: this.symbol,
			price: this.price
		});
		
		setTimeout(update.bind(this), nextUpdate);
	}
	
	// Kick off immedately
	update.call(this);
}

util.inherits(StockDataGenerator, EventEmitter);
	
app.configure(function() {
	app.use(stylus.middleware({
		src: __dirname,
		dest: __dirname + '/public'
	}));
	app.use(express.static(__dirname + '/public'));
});

function start() {
	io.sockets.on('connection', function(socket) {
		socket.on('get-stocks', function(callback) {
			// Map basics of stock data and the tickers into a single response
			var data = Object.keys(stockData).reduce(function(result, symbol) {
				var symbolData = stockData[symbol],
					symbolTicker = stockTickers[symbol];
					
				result[symbol] = {
					symbol: symbol,
					name: symbolData.name,
					shares: symbolData.shares,
					price: symbolTicker.price
				};
				
				return result;
			}, {});
			
			callback(data);
		});
		
		socket.on('get-news-articles', function(data, callback) {
			var symbol = data.symbol;
			
			console.log('get-news-articles', data, callback);
			
			googleNewsService.getNews(symbol, callback);
		});
	});
	
	// Plow updates into every connected socket.io client
	Object.keys(stockTickers).forEach(function(symbol) {
		var stockTicker = stockTickers[symbol];
		
		stockTicker.on('symbol-updated', function(update) {
			io.sockets.emit('symbol-updated', update);
		});
	});
	
	if (argv.host) {
		app.listen(argv.port, argv.host);
		console.log('html5-trader is listening on port ' + argv.host + ':' + argv.port);
	} else {
		app.listen(argv.port);
		console.log('html5-trader is listening on port ' + argv.port);
	}
}

// Read the stored stock static data
fs.readFile(stocksPath, function(err, data) {
	if (err) {
		console.log('Unable to read "' + stocksPath + '".');
		return;
	}
	
	// Create data objects
	stockData = JSON.parse(data);
	stockTickers = Object.keys(stockData)
		.map(function(symbol) {
			return new StockDataGenerator(symbol);
		})
		//  Map into single object indexed by symbol
		.reduce(function(current, item) {
			current[item.symbol] = item;
			return current;
		}, {});
	
	start();
});