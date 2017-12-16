import React from 'react';
import store from '../redux/store';
import { connect } from 'react-redux';
import NBA from 'nba';

var nameStyle = {
	fontSize: 50,
	fontFamily: "Helvetica",
	padding: 15,
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
	}

    //place initialization code here
    componentDidMount() {
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

	render(){
        console.log("info stats: ", this.state.playerInfo)
        if(this.state.playerInfo != undefined){
            return(
    			<div>
    				<h3 style={nameStyle}>{this.state.playerInfo.displayFirstLast}</h3>
                    <p>Position:  {this.state.playerInfo.position}</p>
                    <p>Team:  {this.state.playerInfo.teamCity} {this.state.playerInfo.teamName}</p>
                    <p>Number:  {this.state.playerInfo.jersey}</p>
                    <p>Date Of Birth:  {this.state.playerInfo.birthdate}</p>
                    <p>Height:  {this.state.playerInfo.height}</p>
                    <p>Weight:  {this.state.playerInfo.weight}</p>
                    <p>Seasons in league:  {this.state.playerInfo.seasonExp}</p>
                    <p>Draft Year:  {this.state.playerInfo.draftYear}</p>
                    <p>Draft Round:  {this.state.playerInfo.draftRound}</p>
                    <p>Draft Number:  {this.state.playerInfo.draftNumber}</p>
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
	}
}

export default connect(mapStateToProps,null)(Info);
