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

const getPlayerInfo = (player) => {
	var player = NBA.findPlayer(player);
	return NBA.stats.playerInfo({ PlayerID: player.playerId });
}

class Info extends React.Component {

	constructor(props) {
    	super(props);

    	this.state={
    		playerName : props.player,
            playerInfo : props.playerInfo
    	};

        this.logThis = this.logThis.bind(this);
	}

    componentWillUpdate(nextProps, nextState) {
        console.log('componentWillUpdate', this);
        var playerInfo;
        var info = getPlayerInfo(this.props.player);
        Promise.resolve(info)
            .then((playerInfo) => {
                //console.log(value);
              //  this.setState({playerInfo});
            }, (err) => {
                console.warn(err);
            });
    }

    // place initialization code here
    componentDidMount() {
        console.log('componentDidMount', this);
        var playerInfo;
        var info = getPlayerInfo(this.props.player);
        Promise.resolve(info)
            .then((playerInfo) => {
                //console.log(value);
                this.setState({playerInfo});
            }, (err) => {
                console.warn(err);
            });

    }

    logThis() {
        console.log('logThis', this.props);
    }

	render(){
        return(
			<div>
				<h3 style={nameStyle}>{NBA.findPlayer(this.props.player).firstName}</h3>
				<h3 style={nameStyle}>{NBA.findPlayer(this.props.player).lastName}</h3>
                <button onClick={this.logThis}>Update Player Stats</button>
{/*                <h2 style={nameStyle}>{this.state.playerInfo.commonPlayerInfo[0].height}</h2>
*/}			</div>
		)
	}
}


/*
    @param - the redux state object
*/
function mapStateToProps(state){
	return {
    	player: state.playerReducer,
        playerInfo: getPlayerInfo(state.playerReducer)
	}
}

export default connect(mapStateToProps,null)(Info);
