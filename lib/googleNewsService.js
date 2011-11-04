var request = require('request');

var dateRegex = /, (\d+ \w+ \d+)/;

function lineStartsWithElement(line, name) {
	return line.indexOf('<' + name + '>') === 0;
}

function getLineElementText(line, element) {
	var regex = '<' + element + '>(.*)</' + element + '>',
		match = line.match(regex);
		
	return match ? match[1] : null;
}

function getNews(symbol, callback) {
	var url = 'http://www.google.com/finance/company_news?q=' + symbol + '&output=rss';
	
	request(url, function(err, res, content) {
		if (err) {
			console.log('ERR: Requesting Google News');
			console.log(err);
			
			callback(new Error('Unable to fetch Google news.'), null);
			return;
		}
		
		var lines = content.split('\n'),
			news = [],
			newsItem = null;
		
		lines.forEach(function(line) { 
			var startsWithEl = function(el) { return lineStartsWithElement(line, el); },
				getText = function(el) { return getLineElementText(line, el); };
			
			if (startsWithEl('item')) {
				// New item
				if (newsItem) {
					news.push(newsItem);
				}
				
				newsItem = {};
				
				return;
			} 
			
			if (!newsItem) {
				// Nothing can be done here
				return;
			}
			
			// Try parsing some fields
			if (startsWithEl('title')) {
				newsItem.title = getText('title');
			} else if (startsWithEl('link')) {
				newsItem.link = getText('link');
			} else if (startsWithEl('pubDate')) {
				var date = getText('pubDate'),
					extract = dateRegex.exec(date)[1];
					
				newsItem.date = extract;
			}
		});
		
		if (newsItem) {
			news.push(newsItem)
		}
		
		callback(null, news);
	});
}

exports.getNews = getNews;