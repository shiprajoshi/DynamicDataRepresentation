'use strict';
import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import ShowData from './ShowData';
import Graph from './Graph';
var FusionCharts = require("fusioncharts");
var lineChart;
var chartData;
let year;
let population;
class Chart extends React.Component{

constructor(props){
		super(props);
		this.handleOnClick= this.handleOnClick.bind(this);
		//this.showGraph= this.showGraph.bind(this);
		this.showData= this.showData.bind(this);
		this.state={	
			year: "",
			population: "",
			view: false,
			mydata:[]
		};

		}
	handleOnClick(e){
		e.preventDefault();
		  year= e.target.elements.year.value;
		 population= e.target.elements.population.value;
		this.setState(()=>{
			return{
				year: year,
				population: population,
				view: true

			};
		});	


	// 	//getting correctly
	// axios.get('http://localhost:3000/')
 //  	.then(function (response) {
 //    console.log(response);
 //  })
 //  	.catch(function(error){
 //  		console.log(error + "error")
 //  	})
 //  var headers = {
 //            'Content-Type': 'application/json',
 //            'Authorization': 'JWT fefege...' 
 //        }
	// axios.post('http://localhost:3000/fileUpload', {
 //       year: year,
 //       population: population
 //      }, headers)
 //    .then(function(response){
 //    	console.log(response, 'saved')
 //    })
 //    .catch(function(err){
 //      console.log(err, 'Signature not added, try again');
 //    });


axios({
  method: 'post',
  url: 'http://localhost:3000/fileUpload',
  data: {
     year: year,
     population: population
  }
}).then(function(response){
    	console.log(response, 'saved')
    })
    .catch(function(err){
      console.log(err.response.data, 'error!! try again');
    });
e.target.elements.year.value= "";
e.target.elements.population.value= "";


	}


	onDelete(id){
		console.log('id is' + id)
		var id= id;
		var that = this;
		axios({
  		method: 'delete',
  		url: 'http://localhost:3000/delete',
  		data: {
    		id: id
 		 }
		}).then(function(response){
			if(response.data==true){
				//that.showData();
			}
			else{
				console.log('errorrrrrrrrrrrrrr')
			}
		})
		.catch(function(error){
			console.log('error' + error)
		});


	}

	
	showData() {
		console.log('inside show data')
			// 	//getting correctly
	
  var that = this;
  //this.setState({mydata:null})
  axios.get('http://localhost:3000/showData')
    .then(function (response) {
     // console.log(response,"data from viewDb");
      that.setState({mydata: response.data})
            //	console.log(that.state.mydata);

      if(response!==null){
      	console.log(response.data)
             }
     })
    .catch(function (error) {
      console.log(error);
    });
}


onSave(obj){
  var that = this;
  axios({
  		method: 'put',
  		url: 'http://localhost:3000/delete',
  		data: {
    		id: id
 		 }
		})
  axios.put('http://localhost:3000/editData', {obj:obj}).then(function (response) {
      console.log(response)
      // if(response.data == true)
      // {
      //   //that.viewDB();
      // }
      // else{
      //  // that.setState({error:true})
      // }
    })
    .catch(function (error) {
      console.log(error);
    });
}

	showGraph(){
		var that= this;
		console.log('inside showGraph')
	
	
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
      console.log(chartData)
      var categoriesArray = [{
          "category" : data["categories"]
      }];

      lineChart = new FusionCharts({
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
      // lineChart.render();
      console.log(lineChart);
    }

  });
});

		console.log('hg')

	}




render(){
			return(
	<div>
		{lineChart}
		<form onSubmit={this.handleOnClick} method="POST">
			Year:
			<input type="text" id="year"/>
			Population:
			<input type="text" id="population"/>
			<button>Add data</button>
		</form>
		
		<ShowData mydata={this.state.mydata}  
				  showData={this.showData} 
				  onDelete={this.onDelete} 
				  onSave={this.onSave}></ShowData>
	</div>
	);
		}
	}

export default Chart;
