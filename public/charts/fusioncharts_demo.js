var chartData;

$(function(){
  $.ajax({

    url: 'http://localhost:3000/fuelPrices',
    type: 'GET',
    success : function(data) {
      chartData = data;
      var chartProperties = {
        "caption": "Variation of Petrol and Diesel price in Bangalore",
        "numberprefix": "Rs",
        "xAxisName": "Month",
        "yAxisName": "Price"
      };

      var categoriesArray = [{
          "category" : data["categories"]
      }];

      var lineChart = new FusionCharts({
        type: 'msline',
        renderAt: 'chart-location',
        width: '1000',
        height: '600',
        dataFormat: 'json',
        dataSource: {
          chart: chartProperties,
          categories : categoriesArray,
          dataset : data["dataset"]
        }
      });
      lineChart.render();
    }
  });
});
