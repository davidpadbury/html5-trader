define(['text!./addWatchView.html'], function(tmpl) {
	
	var symbolRegex = /^\w+$/;
	
	var AddWatchView = Backbone.View.extend({
		events: {
			'submit form': 'addWatchSubmitted'
		},
		initialize: function(options) {
			$.tmpl(tmpl).appendTo(this.el);
			
			this.bus = options.bus;
			
			this.symbolText = this.$('.add-symbol');
		},
		addWatchSubmitted: function(e) {
			var symbol;

			e.preventDefault();
						
			symbol = this.symbolText.val();
			
			// Add the symbol
			if (symbolRegex.exec(symbol)) {
				this.bus.pub('add-symbol-watch', {
					symbol: symbol
				});
				
				// Clear the textbox
				this.symbolText.val('');
			}
		}
	});
	
	return AddWatchView;
	
});