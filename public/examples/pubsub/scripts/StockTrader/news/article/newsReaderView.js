define(function() {
	
	function createArticleElement(article) {
		var dateEl = $('<div>').text(article.date),
			titleEl = $('<div>').html(article.title),
			linkEl = $('<a>').attr({
				href: article.link,
				target: '_blank',
				title: article.title
			});
			
		linkEl.append(dateEl).append(titleEl);
		
		return $('<li>').append(linkEl);
	}
	
	var NewsReaderView = Backbone.View.extend({
		title: 'News Articles',
		initialize: function() {
			var bus = this.options.bus,
				el = $(this.el);
				
			el.addClass('news-articles');
			
			this.bus = bus;
			
			this.newsListEl = $('<ul>').addClass('news').appendTo(el);
			
			this.bus.sub('symbol-selected', this.symbolSelected.bind(this));
		},
		
		symbolSelected: function(data) {
			var symbol = data.symbol;
			
			this.bus.pub('get-news-articles', { symbol: symbol }, this.gotNews.bind(this));
		},
		
		gotNews: function(err, news) {
			var newsListEl = this.newsListEl;
			
			newsListEl.children().remove();
			
			if (err) { 
				return;
			}
			
			news.forEach(function(article) {
				var articleEl = createArticleElement(article);
				
				newsListEl.append(articleEl);
			});
		}
	});
	
	return NewsReaderView;
});