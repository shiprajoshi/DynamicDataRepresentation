import React from 'react';
import ReactDOM from 'react-dom';
var mydata;
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
						<button onClick={this.props.showData}>Show Data</button>
						<table>
						 <thead>
							 <tr>
								<th>Year</th>
								 <th>Population</th>
								 <th>Id </th>
							 </tr>
							</thead>


				<tbody>
				 <tr>   
					{
					this.props.mydata.map((data,index)=>{
					return(
					<tbody key={index}>
								<tr>
								<td  className="mdl-data-table__cell--non-numeric">
									<input
									id="year"
									defaultValue ={data['year']}
									onChange={this.editData} readOnly={this.state.edit== true ? false : true}
									/>
								</td>
								<td>
									<input
									 id="population"
									 defaultValue = {data['population']}
									 onChange={this.editData}
									 readOnly={this.state.edit== true ? false : true}
									 />
								 </td>
								 <td>
									<input 
									 id="id"
									 defaultValue = {data['_id']}
									 onChange={this.editData}
									 readOnly = {true}
									 />
								 </td>
								<td>
								<button onClick={()=> this.onDelete(data['_id'])}>Delete</button>
								</td>
								{
									this.state.edit==true
								?<td>
								<button onClick={()=>this.onSave()}>save</button>
								</td>
								:<td>
								<button onClick={()=>this.onEdit(data['year'],data['population'],data['_id'])}>edit</button>
								</td>
						}
								</tr>
							</tbody>

					)
				}  			
				
			)
		}
			
	</tr> 
 </tbody>
</table>
								
		}
				</div>
				);
			
		}

}