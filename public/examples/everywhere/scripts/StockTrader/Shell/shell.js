define(['text!./shell.html', './tabSwitcher', './sidebar'], function(tmpl, TabSwitcher, Sidebar) {

	function fillRegions(modules, regions, bus) {
	    // Go through each module by name
	    Object.keys(modules).forEach(function(moduleName) {
	        var module = modules[moduleName],
	                views = module.views;

	        // Go through each region which defines views
	        Object.keys(views).forEach(function(regionName) {
	            var viewsInRegion = views[regionName];

	            viewsInRegion.forEach(function(view) {
	                var viewInstance = new view({ bus: bus });
	                regions[regionName].add(viewInstance);
	            });
	        });
	    });
	}

	function Shell(options) {
		this.options = options;
		this.bus = options.bus;
		
		// Generate element
		this.el = $.tmpl(tmpl).appendTo(options.container);
		
		var tabSwitcher = new TabSwitcher({
			bus: this.bus,
            headerEl: this.el.find('.control-bar ul'),
            screenEl: this.el.find('.screens')
	    });
	
		var toolbar = this.el.find('.toolbar');

	    var regions = {
	        main: tabSwitcher,
	        research: new Sidebar({
				bus: this.bus,
	            el: this.el.find('.sidebar .details')
	        }),
			toolbar: {
				add: function(view) {
					toolbar.append(view.el);
				}
			}
	    };
		fillRegions(options.modules, regions, this.bus);
	}
	
	Shell.prototype = {
		
	};
	
	return Shell;
	
});