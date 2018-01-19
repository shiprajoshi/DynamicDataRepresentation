import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

 import 'normalize.css/normalize.css';
import './styles/styles.scss';


ReactDOM.render(
	<MuiThemeProvider><AppRouter /></MuiThemeProvider>, document.getElementById('app')

	);
