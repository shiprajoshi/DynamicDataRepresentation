import React from 'react';
import ReactDOM from 'react-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
var mydata;
	const style = {
  margin: 12,
};
export default class ShowData extends React.Component{
	constructor(props){
		super(props);
		this.onEdit= this.onEdit.bind(this);
		this.state={
			year: "",
			population: "",
			id:"",
			edit:false,
			mydata:[]
		};
	}

	onEdit= (year, population,id)=>{ 
	console.log(year, population, id);
	//console.log(e);
	//e.target.readOnly= false;
		this.setState(()=>{
			return{
				year: year,
				population: population,
				edit: true,
				id: id
			}
		})
	 // console.log(this.state)

	}

	onSave = () => {
	console.log('showdata.onsave')
		var obj= {
		year: this.state.year,
	  population:this.state.population,
	  id: this.state.id
		}
	 console.log(obj);
	 //console.log('save')
		this.setState({edit:false})
		this.props.onSave(obj)
	}


	onDelete = (id)=>{
		console.log('id to be deleted' + id);
		this.props.onDelete(id)
	}

	editData=(e)=>{
		if(e.target.id=='year')
			this.setState({year: e.target.value})
		else if(e.target.id=='population')
			this.setState({population: e.target.value})
	}

		
		render(){
			//console.log(this.props.mydata + "m")
			return(
				<div>
				 <RaisedButton label="Show Data" primary={true} style={style} onClick={this.props.showData} />
						<Table>
						 <TableHeader>
							 <TableRow>
								<TableHeaderColumn>Year</TableHeaderColumn>
								 <TableHeaderColumn>Population</TableHeaderColumn>
								 <TableHeaderColumn>Id </TableHeaderColumn>
							 </TableRow>
							</TableHeader>
				}


				<TableBody displayRowCheckbox={false}>
				 <TableRow>   
					{
					this.props.mydata.map((data,index)=>{
					return(
					<TableBody key={index} displayRowCheckbox={false}>
								<TableRow>
								<TableRowColumn>
									<input
									id="year"
									defaultValue ={data['year']}
									onChange={this.editData} readOnly={this.state.edit== true ? false : true}
									/>
								</TableRowColumn>
								<TableRowColumn>
									<input
									 id="population"
									 defaultValue = {data['population']}
									 onChange={this.editData}
									 readOnly={this.state.edit== true ? false : true}
									 />
								 </TableRowColumn>
								 <TableRowColumn>
									<input 
									 id="id"
									 defaultValue = {data['_id']}
									 onChange={this.editData}
									 readOnly = {true}
									 />
								 </TableRowColumn>
								<TableRowColumn>
								<button onClick={()=> this.onDelete(data['_id'])}>Delete</button>
								</TableRowColumn>
								{
									this.state.edit==true
								?<TableRowColumn>
								<button onClick={()=>this.onSave()}>save</button>
								</TableRowColumn>
								:<TableRowColumn>
								<button onClick={()=>this.onEdit(data['year'],data['population'],data['_id'])}>edit</button>
								</TableRowColumn>
						}
								</TableRow>
							</TableBody>

					)
				}  			
				
			)
		}
			
	</TableRow> 
 </TableBody>
</Table>
								
		}
				</div>
				);
			
		}

}