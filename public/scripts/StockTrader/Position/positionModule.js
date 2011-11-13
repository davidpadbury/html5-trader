define(['./summary/summaryView', './pieChart/pieChartView'], function (SummaryView, PieChartView) {

    return {
        views: {
            main: [
                SummaryView
            ],
            research: [
                PieChartView
            ]
        }
    };

});
