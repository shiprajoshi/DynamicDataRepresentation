import React from 'react';
import ReactDOM from 'react-dom';
export default class Graph extends React.Component{
	constructor(props){
		super(props);
		//this.showGraph= this.showGraph.bind(this);
		this.state={
			view: false
			
		};
	}		
	// showGraph(){
	// 	this.setState(()=>{
	// 		return
	// 		{
	// 			view: true
	// 		}
	// 	})
	// 	console.log('hi')
		
	// }
	componentDidMount(){
		
	}

		render(){
			return(
				<div>
					<button onClick={this.props.showGraph} >Graph</button>
				</div>
				);
			
		}

}