define(['text!./addWatchView.html'], function(tmpl) {
	
	var AddWatchView = Backbone.View.extend({
		events: {
			'submit form': 'symbolAdded'
		},
		initialize: function() {
			$(tmpl).appendTo(this.el);
			
			this.addSymbolText = this.$('.add-symbol');
		},
		symbolAdded: function(e) {
			var symbol;
			
			e.preventDefault();
			
			symbol = this.addSymbolText.val();
			alert(symbol);
		}
	});
	
	return AddWatchView;
});