
import React from 'react';
import { NBA } from 'nba';

//const NBA = require("nba");
const curry = NBA.findPlayer('Stephen Curry');

export default class App extends React.Component {


	render() {
		return(
			<div style={{textAlign: 'center'}}>
				<h1> curry.firstName</h1>
			</div>);
	}
}