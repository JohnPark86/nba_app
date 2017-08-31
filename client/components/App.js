
import React from 'react';
const NBA = require("nba");

//const curry = NBA.findPlayer('Stephen Curry');
console.log(NBA);

export default class App extends React.Component {


	render() {
		return(
			<div style={{textAlign: 'center'}}>
				<h1> curry.firstName</h1>
			</div>);
	}
}