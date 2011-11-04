define(['./Summary/summaryView', './PieChart/pieChartView'], function (SummaryView, PieChartView) {

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
