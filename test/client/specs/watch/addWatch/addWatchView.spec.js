describe('addWatchView', function() {
	var AddWatchView;
	
	jasmine.require(['watch/addWatch/addWatchView'], function(awv) {
		setTimeout(function() { throw new Error('got:' + typeof awv);}, 10);
		AddWatchView = awv;
	});
	
	describe('adding a symbol', function() {
		var view, el, bus;
		
		beforeEach(function() {
			try {
			setFixtures(el = sandbox({id: 'host'}));
			
			bus = {
				pub: jasmine.createSpy('pub')
			};
			
			view = new AddWatchView({
				el: el,
				bus: bus
			});
			
			el.find('.add-symbol').val('CSCO');
			el.find('form').submit();
			} catch (e) {
				setTimeout(function() { throw e;}, 10);
			}
		});
		
		it('should have added symbol', function() {
			expect(bus.pub).toHaveBeenCalledWith('add-symbol-watch', {
				symbol: 'CSCO'
			});
		});
		
		it('should have cleared the textbox', function() {
			expect(el.find('.add-symbol').val()).toBe('');
		});
	});
});