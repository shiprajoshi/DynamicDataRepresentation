'use strict';
import React from 'react';
import axios from 'axios';


class Chart extends React.Component{

constructor(props){
		super(props);
		this.handleOnClick= this.handleOnClick.bind(this);
		this.state={	
			year: "",
			population: ""
		};

		}
	handleOnClick(e){
		e.preventDefault();
		 let year= e.target.elements.year.value;
		let population= e.target.elements.population.value;
		this.setState(()=>{
			return{
				year: year,
				population: population

			};
		});	


		//getting correctly
		// axios.get('http://localhost:3000/fileUpload'),
  // 	.then(function (response) {
  //   console.log(response);
  // })
  // 	.catch(function(error){
  // 		console.log(error + "error")
  // 	})
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


this.setState(()=>{
			return{
				year: "",
				population: ""

			};
		});	
e.target.elements.year.value= "";
e.target.elements.population.value= "";




   // $.ajax({
   //    url: '/',
   //    dataType: 'json',
   //    type: 'POST',
   //    data: this.state,
   //    success: function(data) {
   //     console.log('success');
   //    }.bind(this),
   //    error: function(xhr, status, err) {
   //      console.error(err.toString());
   //    }.bind(this)
   //  });

	}

render(){
			return(
	<div>
		<form onSubmit={this.handleOnClick} method="POST">
			Year:
			<input type="text" id="year"/>
			Population:
			<input type="text" id="population"/>
			<button>Add data</button>
		</form>
	</div>

	);
		}
	}

export default Chart;