import React from 'react';
import store from '../redux/store';
import { connect } from 'react-redux';
import NBA from 'nba';

var nameStyle = {
	fontSize: 70,
	fontFamily: "Helvetica",
	padding: 50,
	color: "red"
}

const test = (player) => {
	console.log(NBA.stats)
	var foo = NBA.findPlayer(player)
	NBA.stats.playerInfo({ PlayerID: foo.playerId }).then(console.log);
}

const getPlayerInfo = (player) => {
	var returnInfo = "Player not found";
	var player = NBA.findPlayer(player);
	console.log("player: ", player);
	
	var info = NBA.stats.playerInfo({ PlayerID: player.playerId });
	console.log("info1: ", info)
	
	Promise.resolve(info)
		.then((value) => {
		console.log("resolve: ", info);
		console.log("value: ", value);
	});
} 

class Info extends React.Component {
	
	constructor(props) {
    	super(props);
    	this.state={
    		playerName : props.player
    	};
	}

	render(){
		//test(this.props.player)
		var info = getPlayerInfo(this.props.player);
		console.log("info2: ", info);
		return(
			<div>
				<h3 style={nameStyle}>{NBA.findPlayer(this.props.player).firstName}</h3>
				<h3 style={nameStyle}>{NBA.findPlayer(this.props.player).lastName}</h3>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
    	player: state.playerReducer
	}
}

export default connect(mapStateToProps,null)(Info);