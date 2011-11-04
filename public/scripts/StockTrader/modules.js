define(
	['./Position/positionModule', './Watch/watchModule', './market/marketModule', './news/newsModule'], 
	function (positionModule, watchModule, marketModule, newsModule) {

    return {
        position: positionModule,
		watch: watchModule,
		market: marketModule,
		news: newsModule
    };

});
