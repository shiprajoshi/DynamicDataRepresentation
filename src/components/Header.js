import React from 'react';
import {BrowserRouter, Route, Switch, NavLink as Link} from 'react-router-dom';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

const Header=()=>(
	<header>
		<AppBar
          title="Dynamic Data Representation"
          iconElementLeft={<IconButton><NavigationClose /></IconButton>}
          >
		<FlatButton style={{"marginTop": "16px"}}><Link to="/" activeClassName="is-active" exact={true} style={{"color": "white", "textDecoration": "none"}} >Home</Link></FlatButton>
		<FlatButton style={{"marginTop": "16px"}}><Link to="/blueprint" activeClassName="is-active" style={{"color": "white", "textDecoration": "none"}} >BluePrint</Link></FlatButton>
		<FlatButton style={{"marginTop": "16px"}}><Link to="/chart" activeClassName="is-active" style={{"color": "white", "textDecoration": "none"}} >Charts</Link></FlatButton>
		<FlatButton style={{"marginTop": "16px"}}><Link to="/workflow" activeClassName="is-active" style={{"color": "white", "textDecoration": "none"}} >WorkFlow</Link></FlatButton>
		</AppBar>
	</header>
	);
export default Header;

