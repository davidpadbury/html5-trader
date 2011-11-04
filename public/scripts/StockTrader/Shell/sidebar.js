
define(function() {

    function Sidebar(options) {
        this.el = options.el;
    }

    Sidebar.prototype = {
        add: function(view) {
			var header = $('<h1>').text(view.title),
            	container = $('<div>')
                .addClass('detail-widget')
                .append(header)
                .append(view.el);

			view.bind('title-changed', function() {
				header.text(view.title);
			});

            this.el.append(container);
        }
    };

    return Sidebar;

});