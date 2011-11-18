if (window.navigator) {
	// We're in a real browser
	var require = {
		baseUrl: '/public/scripts/stockTrader'
	};
} else {
	// We're in jsdom
	window.navigator = {
		userAgent: 'jsdom'
	};
	
	window.io = {
		connect: function() {
			// should probably do nothing 'ere
			return {
				on: function() { },
				emit: function() { }
			}
		}
	};
}