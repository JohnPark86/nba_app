
import React from 'react';
var test = require('./test');
var NBA = require("nba");
//import NBA from 'nba';
//const curry = NBA.findPlayer('Stephen Curry');
console.log(test);
console.log(NBA);

export default class App extends React.Component {


	render() {
		return(
			<div style={{textAlign: 'center'}}>
				<h1>suck it {test.hello}</h1>
				<h2> curry.firstName</h2>
				
			</div>);
	}
}