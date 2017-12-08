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
	var player = NBA.findPlayer(player);
	console.log("player: ", player);

	return NBA.stats.playerInfo({ PlayerID: player.playerId });
}

class Info extends React.Component {

	constructor(props) {
    	super(props);
    	this.state={
    		playerName : props.player,
            playerInfo : ''
    	};
	}

    componentWillUpdate(nextProps, nextState) {

    }

	render(){
		//test(this.props.player)
        var playerInfo;
		var info = getPlayerInfo(this.props.player);

        Promise.resolve(info)
            .then((value) => {
                playerInfo = value;
        }, (err) => {
            console.warn(err);
        });

		console.log("info2: ", info);
		console.log("v: ", playerInfo);

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
