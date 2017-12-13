import React from 'react';
import store from '../redux/store';
import { connect } from 'react-redux';
import NBA from 'nba';

var nameStyle = {
	fontSize: 60,
	fontFamily: "Helvetica",
	padding: 20,
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

    //place initialization code here
    componentDidMount() {
        console.log('componentDidMount', this);
        if(this.props.player != ""){
            var info = getPlayerInfo(this.props.player);
            Promise.resolve(info)
                .then((playerInfo) => {
                    this.setState({
                         playerInfo
                    });
                }, (err) => {
                    console.warn(err);
            });
        }
    }

    componentWillReceiveProps(nextProps){
        console.log("props: ",this.props);
        console.log("next props: ",nextProps);
        if(this.props.player != nextProps.player){
            var info = getPlayerInfo(nextProps.player);
            Promise.resolve(info)
                .then((playerInfo) => {
                    this.setState({
                         playerInfo: playerInfo.commonPlayerInfo[0]
                    });
                }, (err) => {
                    console.warn(err);
            });
        }
    }

    logThis() {
        console.log('logThis', this.props);
        console.log('logState', this.state)
    }

	render(){
        if(this.props.player != ""){
            return(
    			<div>
    				<h3 style={nameStyle}>{NBA.findPlayer(this.props.player).firstName}
    				          {NBA.findPlayer(this.props.player).lastName}</h3>
                    <h3 style={nameStyle}>{this.state.playerInfo.height}</h3>
                    <button onClick={this.logThis}>Update Player Stats</button>
    		</div>
    		)
        }
        return null;
	}
}


/*
    Maps Redux state to component props.
    @param - the redux state object
*/
function mapStateToProps(state){
	return {
    	player: state.playerReducer,
      //  playerInfo: getPlayerInfo(state.playerReducer)
	}
}

export default connect(mapStateToProps,null)(Info);
