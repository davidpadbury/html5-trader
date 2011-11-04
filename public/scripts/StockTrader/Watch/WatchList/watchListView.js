
define(['text!./table.html', 'text!./row.html'], function(tableTmpl, rowTmpl) {
	
	var WatchListView = Backbone.View.extend({
		name: 'Watch List',
		events: {
			'click a[data-command=remove]:': 'removeClicked'
		},
		initialize: function(options) {
			var el = $(this.el),
				tableEl = $(tableTmpl);
				
			el.append(tableEl);
			
			// Watches will be a dictionary of symbols to their data
			this.watches = {};
			this.bus = options.bus;
			this.tableEl = tableEl;
			
			this.bus.sub('add-symbol-watch', this.addSymbolWatch.bind(this));
			this.bus.sub('symbol-updated', this.symbolUpdated.bind(this));
		},
		
		addSymbolWatch: function(data) {
			var symbol = data.symbol,
				rowEl, priceEl,
				watch;
			
			// Already have it
			if (this.watches.hasOwnProperty(symbol)) {
				return;
			}
			
			// Create watch row
			rowEl = $.tmpl(rowTmpl, {
				symbol: data.symbol
			});
			
			this.tableEl.find('tbody').append(rowEl);
			
			priceEl = rowEl.find('.price');
			
			// Create watch item
			watch = {
				el: rowEl,
				update: function(data) {
					var priceText = '$' + $.format.number(data.price, '#,##0.00');
					
					priceEl.text(priceText);
				},
				remove: function() {
					rowEl.remove();
				}
			};
			
			// Add to watches
			this.watches[symbol] = watch;
			
			// Request a focus incase anything is listening
			// In our example this should ensure that the watchlist tab is visible
			// But I don't know it's there of course... :)
			this.trigger('focus');
		},
		
		symbolUpdated: function(data) {
			var symbol = data.symbol,
				watch;
			
			if (this.watches.hasOwnProperty(symbol) && (watch = this.watches[symbol])) {
				watch.update(data);
			}
		},
		
		removeClicked: function(e) {
			var watchRow = $(e.target).parents('tr[data-symbol]'),
				symbol = watchRow.attr('data-symbol'),
				watch = this.watches[symbol];
			
			e.preventDefault();
			
			if (!watch) {
				return;
			}
			
			// Remove the watch
			watch.remove();
			delete this.watches[symbol];
		}
	});
	
	return WatchListView;
});