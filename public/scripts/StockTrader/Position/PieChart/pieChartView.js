
define(function() {

	var PieChartView = Backbone.View.extend({
        title: 'Pie Chart', // That's an original name

        initialize: function(options) {
			var chartEl = $('<div>').addClass('chart');
			
            $(this.el).append(chartEl);

			options.bus.pub('get-stock-data', function(stockData) {
				// Create a series data object of just the symbol and number of shares
				var data = Object.keys(stockData).map(function(symbol) {
					var symbolData = stockData[symbol];
					
					return {
						label: symbol,
						data: symbolData.shares
					};
				});
				
				// Create pie chart
				$.plot(chartEl, data, {
					series: {
						pie: {
							show: true,
							radius: 1,
							label: {
								radius: 3/4,
								formatter: function(label, series) {
									return '<div style="color: white; font-size: 10px;">' + label + '</div>';
								}
							}
						}
					},
					legend: {
						show: false
					}
				})
			});
        },

        render: function() {
            var symbols = ['CSCO', 'MSFT', 'APPL', 'GOOG', 'ORCL'],
                pieData = [],
                i;

            for (i = 0; i < symbols.length; i++) {
                pieData.push({
                    label: symbols[i],
                    data: Math.floor(Math.random() * 100) + 1
                });
            }

            $.plot(this.el, pieData, {
                series: {
                    pie: {
                        show: true
                    }
                },
                legend: {
                    show: false
                }
            });
        }
    });

    return PieChartView;
    
});