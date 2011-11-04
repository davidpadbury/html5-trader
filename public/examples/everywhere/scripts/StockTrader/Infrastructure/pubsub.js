define(function() {
	
	var slice = Array.prototype.slice;
	
	function PubSub() {
		this.subscriptions = [];
	}
	
	PubSub.prototype.sub = function sub(topic, fn) {
		var subs = this.subscriptions,
			topicSubs = subs[topic] || (subs[topic] = []);
			
		topicSubs.push(fn);
		
		// Create a unsubscribe to return
		return function unsub() {
			var subIndex = topicSubs.indexOf(fn);
			
			if (subIndex >= 0) {
				// Remove the single item
				topicSubs.splice(subIndex, 1);
			}
		};
	};
	
	PubSub.prototype.pub = function(topic) {
		var subs = this.subscriptions,
			topicSubs = subs[topic] || [],
			// Pull out all the arguments except the topic as an array
			args = slice.call(arguments, 0).slice(1);
		
		// Make a copy of the subscriptions incase it is modified during the duration of the calls (e.g. an unsub)
		topicSubs.slice(0).forEach(function(sub) {
			sub.apply(null, args);
		});
	};
	
	return PubSub;
});