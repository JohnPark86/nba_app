
import React from 'react';
var test = require('./test');
const NBA = require("nba");
//import NBA from 'nba';
//const curry = NBA.findPlayer('Stephen Curry');
console.log(test);
console.log(NBA);

export default class App extends React.Component {


	render() {
		return(
			<div style={{textAlign: 'center'}}>
				<h1> curry.firstName</h1>
				<h1>{test.hello}</h1>
			</div>);
	}
}