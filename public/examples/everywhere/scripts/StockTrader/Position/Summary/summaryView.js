define(['text!./table.html','text!./row.html'], function(tableTmpl, rowTmpl) {
	
	var priceFormat = '#,##0.00';
	
	var SummaryView = Backbone.View.extend({
		name: 'Position',
		events: {
			'click tr': 'rowClicked'
		},
		initialize: function(options) {
			var bus = options.bus;
			
			this.bus = bus;
			
			// Initialized the current selected row to an empty selector
			this.selectedRowEl = $();
			// Initialize a dictionary which will contain each symbol to it's row selector
			this.rows = {};
			this.table = $(tableTmpl);
			
			$(this.el).append(this.table);
			
			// Ask for stock data
			bus.pub('get-stock-data', this.loadStockData.bind(this));
			
			// Subscribe to updates
			bus.sub('symbol-updated', this.symbolUpdated.bind(this));
			
			bus.sub('symbol-selected', this.symbolSelected.bind(this));
		},
		formatPrice: function(price) {
			return '$' + $.format.number(price, priceFormat);
		},
		loadStockData: function(data) {
			var rows = this.rows,
				tbody = this.table.find('tbody'),
				formatPrice = this.formatPrice;
			
			Object.keys(data).forEach(function(symbol) {
				var symbolData = data[symbol],
					shares = symbolData.shares,
					price = symbolData.price,
					marketValue = price * shares,
					costBasis = marketValue,
					rowEl = $.tmpl(rowTmpl, {
						symbol: symbolData.symbol,
						price: formatPrice(symbolData.price),
						costBasis: formatPrice(costBasis),
						marketValue: formatPrice(marketValue),
						gainLoss: formatPrice(costBasis - marketValue),
						shares: symbolData.shares
					}),
					priceEl = rowEl.find('.price'),
					marketValueEl = rowEl.find('.market-value'),
					gainLossEl = rowEl.find('.gain-loss');
					
				tbody.append(rowEl);
				rows[symbol] = {
					el: rowEl,
					update: function(data) {
						var marketValue = shares * data.price;
						priceEl.text(formatPrice(data.price));
						marketValueEl.text(formatPrice(marketValue));
						gainLossEl.text(formatPrice(costBasis - marketValue));
					}
				};
			});
		},
		symbolUpdated: function(data) {
			var symbol = data.symbol,
				row;
			
			if (this.rows.hasOwnProperty(symbol) && (row = this.rows[symbol])) {
				row.update(data);
			}
		},
		rowClicked: function(e) {
			var rowEl = $(e.currentTarget),
				symbol = rowEl.attr('data-symbol');
			
			this.bus.pub('symbol-selected', {
				symbol: symbol
			});
		},
		symbolSelected: function(data) {
			var row = this.rows[data.symbol];
			
			if (row && row.el) {
				this.selectedRowEl.removeClass('selected');
				this.selectedRowEl = row.el;
				this.selectedRowEl.addClass('selected');
			}
		}
	});

    return SummaryView;
});
