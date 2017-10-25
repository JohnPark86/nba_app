
import React from 'react';
var NBA = require("nba");

const curry = NBA.findPlayer('Stephen Curry');

console.log(NBA);
console.log(curry);

export default class App extends React.Component {


	render() {
		return(
			<div style={{textAlign: 'center'}}>
				<input type="text" />
				<h2> {curry.fullName}</h2>
			</div>);
	}
}