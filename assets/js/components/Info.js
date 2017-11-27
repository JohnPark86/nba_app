import React from 'react';
import store from '../redux/store';
import { connect } from 'react-redux';
var NBA = require("nba");

// let player;
// store.subscribe( () => {
// 		player = store.getState().searchReducer;
// 		console.log("test1: ", player)
// });

//const curry = NBA.findPlayer(player);

class Info extends React.Component {
	
	constructor(props) {
    	super(props);
	}

	render(){
		return(
			<h2>{this.props.player}</h2>
		)
	}
}


function mapStateToProps(state){
	console.log("mapStateToProps")
	return {
    	player: state.searchReducer
	}
}

export default connect(mapStateToProps,null)(Info);