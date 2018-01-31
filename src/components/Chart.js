'use strict';
import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import ShowData from './ShowData';
import Graph from './Graph';
import {Bar, Line, Pie} from 'react-chartjs-2';
var FusionCharts = require("fusioncharts");
var lineChart;
var chartData;
let year;
let population;
var categoriesArray;
var linedata= [];
var linelabel=[];
var chartdata=[];
var chartlabel=[];
var chlab=[];
var col=[];
function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
class Chart extends React.Component{

	constructor(props){
		super(props);
		this.handleOnClick= this.handleOnClick.bind(this);
		//this.showGraph= this.showGraph.bind(this);
		this.showData= this.showData.bind(this);
		this.state={    
			year: "",
			population: "",
			id:"",
			ajaxcall: false,
			mydata:[], 
			chartData:{
				labels:[],
				datasets:[{
					label:'year population graph',
					data:[],
					backgroundColor: []
				}]
			}
		};

	}
	

	handleOnClick(e){
		var that= this;
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

		axios({
			method: 'post',
			url: 'http://localhost:3000/fileUpload',
			data: {
				year: year,
				population: population
			}
		}).then(function(response){
			//that.setState({ajaxcall: true})
			console.log(response, 'saved')
		})
		.catch(function(err){
			console.log(err.response.data, 'error!! try again');
		});
		e.target.elements.year.value= "";
		e.target.elements.population.value= "";


	}

onAddData=()=>{
	this.setState({ajaxcall: true});
	this.showData();
}
	// handleAddData = () =>{
	// 	console.log("in handleAddData")
	// 	var that= this;
	// 		$.ajax({
	// 			url: 'http://localhost:3000/populationData',
	// 			type: 'GET',
	// 			success : function(data) {
	// 				console.log(data,"dataaaaaaaaaaaa")
	// 				var x= data['dataset']
	// 				console.log(x)
	// 				linedata.push(x['0']['data'])
	// 				console.log(linedata)
	// 				var ldata=[];
	// 				ldata.push(linedata[0]);
	// 				console.log(ldata);
	// 				linedata= ldata[0];
	// 				console.log(linedata)
	// 				var arrlen= linedata.length;
	// 				for(var i=0; i<arrlen; i++)
	// 				{
	// 					col.push(getRandomColor());
	// 				}
	// 				categoriesArray = [{
	// 					"category" : data["categories"]
	// 				}];
	// 				linelabel.push(categoriesArray['0']['category'])
	// 				chartlabel.push(linelabel[0]);
	// 				chlab= chartlabel[0];
	// 				that.setState(()=>{
	// 							return{
	// 								chartData:{
	// 								labels: chlab,
	// 								datasets:[{
	// 									label:'Population',
	// 									data: linedata,
	// 									backgroundColor: col
	// 									}]
	// 								}
	// 							}
 // 						 });
	// 			 }

	// 		});
	// 		console.log(chlab);
	// 	console.log(linedata)
	// } 

	componentDidMount(){
		console.log('inside did mount')
			var that= this;
			$.ajax({
				url: 'http://localhost:3000/populationData',
				type: 'GET',
				success : function(data) {
					console.log(data,"dataaaaaaaaaaaa")
					var x= data['dataset']
					console.log(x)
					linedata.push(x['0']['data'])
					console.log(linedata)
					var ldata=[];
					ldata.push(linedata[0]);
					console.log(ldata);
					linedata= ldata[0];
					console.log(linedata)
					var arrlen= linedata.length;
					for(var i=0; i<arrlen; i++)
					{
						col.push(getRandomColor());
					}
					categoriesArray = [{
						"category" : data["categories"]
					}];
					linelabel.push(categoriesArray['0']['category'])
					chartlabel.push(linelabel[0]);
					chlab= chartlabel[0];
					that.setState(()=>{
								return{
									chartData:{
									labels: chlab,
									datasets:[{
										label:'Population',
										data: linedata,
										backgroundColor: col
										}]
									}
								}
 						 });
				 }

			});
		console.log(chlab);
		console.log(linedata)
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
			//that.forceUpdate();
	}

	
	showData=()=> {
			console.log('inside show data')
			
			var that = this;
			this.state.mydata=[];
  			axios.get('http://localhost:3000/showData')
  			.then((response) => {
  			console.log(response.data,"data from showdata")
	 		that.setState(()=>{
	 			return{
	 				mydata: response.data, 
	 				ajaxcall: true
	 			}
	 		});
			//  console.log(that.state.mydata);
			if(response!==null){
			that.setState(()=>{
				return{
					ajaxcall: true
				}
			});

				console.log(response.data)

			}
		})
  .catch(function (error) {
	console.log(error);
});
//this.forceUpdate();

}


onSave(obj){
	var that = this;

	axios.post('http://localhost:3000/editData', {obj:obj}).then(function (response) {
		console.log(response)
	  if(response.data == true)
	  {
		//that.showData();
	  }
	  else{
	   // that.setState({error:true})
	  }
  })
	.catch(function (error) {
		console.log(error);
	});
}





render(){
	//console.log(this.state)
	//console.log(this.props.lineChart)
	return(
		<div  className="container"  style={{marginTop:'50px'}}>

		<Bar data={this.state.chartData} options={{maintainAspectRatio: true, responsive: true, scales:{yAxes:[{scaleLabel:{display: true, labelString:'population in crores'}}], xAxes:[{scaleLabel:{display: true, labelString:'years'}}]} } } />
		<form  className="col-sm-12 col-md-12" onSubmit={this.handleOnClick} method="POST">
		<table className="table-bordered">  
	 <tbody>  
	<tr>  
	  <td><b>Year</b></td>  
	  <td>  
		<input type="number" id="year"/>
	  </td>  
	</tr>  
  
	<tr>  
	  <td><b>Population</b></td>  
	  <td>  
		<input type="number" id="population"/>
	  </td>  
	</tr> 
	<tr>   
	  <td>  
		<button onClick={this.onAddData}>Add data</button>
	  </td>  
	</tr>  
  
 </tbody>  
	</table>  
</form>

		{this.state.ajaxcall && <ShowData mydata={this.state.mydata}  
		showData={this.showData} 
		onDelete={this.onDelete} 
		onSave={this.onSave}></ShowData>}
		<Graph lineChart={this.props.lineChart}> </Graph>
		</div>
		);
}
}

export default Chart;
