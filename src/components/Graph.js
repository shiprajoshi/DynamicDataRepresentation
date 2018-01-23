import React from 'react';
import ReactDOM from 'react-dom';
//console.log(this.props.lineChart)
export default class Graph extends React.Component{
	constructor(props){
		super(props);
		//this.showGraph= this.showGraph.bind(this);
		this.state={
			view: false
			
		};
	}		


		render(){
			//console.log(this.props.lineChart)
			return(
				<div>
				<p>
					{this.props.lineChart}
				</p>
				</div>
				);
			
		}

}