import React from 'react';
import ReactDOM from 'react-dom';
var mydata;
export default class ShowData extends React.Component{
	constructor(props){
		super(props);
		this.state={
			year: "",
			population: "",
			_id:"",
			edit:false,
			mydata:[]
		};
	}

	onEdit=(year, population,id)=>{
		console.log(year, population, id);
		this.setState(()=>{
			return{
				year: year,
				population:population,
				edit: true
			}
		})

	}

	onSave = () => {
	console.log('showdata.onsave')
    var obj= {
     year: this.state.year,
	 population:this.state.population,
	 edit: true,
	 _id: this.state.id
    }
    this.setState({edit:false})
   this.props.onSave(obj)
  }


	onDelete = (id)=>{
		console.log('id to be deleted' + id);
		this.props.onDelete(id)
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
                  <input  readOnly= {true}
                  id="year"
                  defaultValue ={data['year']}/>
                </td>
                <td>
                  <input
                   id="population"
                   defaultValue = {data['population']}/>
                 </td>
                 <td>
                  <input readOnly={true}
                   id="id"
                   defaultValue = {data['_id']}/>
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