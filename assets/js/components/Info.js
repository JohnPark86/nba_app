import React from 'react';
import store from '../redux/store';
var NBA = require("nba");

let player;
store.subscribe( () => {
		player = store.getState().searchReducer;
		console.log("test1: ", player)
});

//const curry = NBA.findPlayer(player);

export default class Info extends React.Component {
	
	render(){
		return(
			<h2>{player}</h2>
		)
	}
}