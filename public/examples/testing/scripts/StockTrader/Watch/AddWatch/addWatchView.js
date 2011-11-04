define(['text!./addWatchView.html'], function(tmpl) {
	
	var AddWatchView = Backbone.View.extend({
		events: {
			'submit form': 'symbolAdded'
		},
		initialize: function(options) {
			this.bus = options.bus;
			
			$(tmpl).appendTo(this.el);
			
			this.addSymbolText = this.$('.add-symbol');
		},
		symbolAdded: function(e) {
			var symbol;
			
			e.preventDefault();
			
			symbol = this.addSymbolText.val();
			
			this.bus.pub('add-symbol-watch', {
				symbol: symbol
			});
		}
	});
	
	return AddWatchView;
});