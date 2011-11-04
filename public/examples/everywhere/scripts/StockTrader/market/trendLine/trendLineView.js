define(['text!./trendLineView.html'], function(tmpl) {
	
	var maxPoints = 10;
	
	var TrendLineView = Backbone.View.extend({
		title: 'History',
		initialize: function() {
			var bus = this.options.bus,
				chartEl = $('<div>').addClass('chart');
			
			$(this.el).append(chartEl);
			
			this.bus = bus;
			this.chartEl = chartEl;
			
			bus.sub('symbol-selected', this.symbolSelected.bind(this));
			bus.sub('symbol-updated', this.symbolUpdated.bind(this));
		},
		createChart: function() {
			this.chart = $.plot(this.chartEl, [ this.symbolData ], {
				series: { shadowSize: 0 },
				yaxis: { },
				xaxis: { show: false }
			});
		},
		symbolSelected: function(data) {
			var symbol = data.symbol;
			
			this.symbol = symbol;
			this.symbolData = [];
			
			// Update the header
			this.title = symbol + ' History';
			this.trigger('title-changed');
			
			this.createChart();
		},
		symbolUpdated: function(data) {
			var symbol = data.symbol,
				time;
			
			if (symbol !== this.symbol) {
				// Not our symbol
				return;
			}
			
			time = new Date().getTime();
			
			// Put in new point
			this.symbolData.push([time, data.price]);
			
			// Trim items to max number
			if (this.symbolData.length > maxPoints) {
				this.symbolData.splice(0, this.symbolData.length - maxPoints);
			}
			
			this.chart.setData([ this.symbolData ]);
			this.chart.setupGrid();
			this.chart.draw();
		}
	});
	
	return TrendLineView;
});