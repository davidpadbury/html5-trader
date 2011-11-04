define([], function () {

    var uid = 0;

    function TabSwitcher(options) {
        this.headerEl = options.headerEl;
		this.screenEl = options.screenEl;
		
        this.views = {};

        this.initialize();
    }

    function createScreenLinkItem(view, index) {
        var li = $('<li>');

        $('<a>')
            .attr({
				'data-screen-index': index,
				href: '#'
			})
            .text(view.name)
            .appendTo(li);

        return li;
    }

    TabSwitcher.prototype = {
        initialize: function () {
            this.headerEl.delegate('a', 'click', this.screenClick.bind(this));
        },

        add: function(view) {
            var viewUid = uid++;
            var screenLink = createScreenLinkItem(view, viewUid);
			
            this.headerEl.append(screenLink);

            var el = $('<div>').addClass('screen').addClass('hidden')
                .append(view.el)
                .appendTo(this.screenEl);

            this.views[viewUid] = {
                view: view,
                el: el
            };

			// Open the tab if it triggers focus
			view.bind('focus', this.openView.bind(this, viewUid));

            if (!this.currentView) {
                this.openView(0);
            }
        },

        screenClick: function(e) {
			var screenIndex;
			
            e.preventDefault();

			screenIndex = $(e.target).attr('data-screen-index');
			
			this.openView(screenIndex);
        },

        openView: function(id) {
            var view = this.views[id];

			if (view === this.currentView) {
				// Do nothing, you're already open you twerp
				return;
			}
            else if (this.currentView) {
                this.currentView.el.addClass('back').removeClass('front');
                view.el.addClass('front').removeClass('back').removeClass('hidden');
            } else {
                view.el.removeClass('hidden');
            }

            this.currentView = view;
            this.headerEl.find('li').removeClass('selected');
            this.headerEl.find('li a[data-screen-index=' + id + ']').parents('li').addClass('selected');
        }
    };

    return TabSwitcher;

});