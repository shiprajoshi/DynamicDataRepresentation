import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch, Link, NavLink} from 'react-router-dom';
import Home from './../components/Home';
import BluePrint from './../components/BluePrint';
import Chart from './../components/Chart';
import WorkFlow from './../components/WorkFlow';
import Header from './../components/Header';
import PageNotFound from './../components/PageNotFound';


const AppRouter=()=>(
	<BrowserRouter>
	<div>
	<Header />
	<Switch>
		<Route path="/" component={Home} exact={true}/>
		<Route path="/blueprint" component={BluePrint} />
		<Route path="/chart" component={Chart}/>
		<Route path="/workflow" component={WorkFlow}/>
		<Route component={PageNotFound} />
	</Switch>
	</div>
	</BrowserRouter>
	);

export default AppRouter;