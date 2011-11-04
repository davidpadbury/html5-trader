	
define(['./WatchList/watchListView', './AddWatch/addWatchView'], function (WatchListView, AddWatchView) {

    return {
        views: {
            main: [ WatchListView ],
			toolbar: [ AddWatchView ]
        }
    };

});