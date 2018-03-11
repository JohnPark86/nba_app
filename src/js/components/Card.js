import React from 'react';
import store from '../redux/store';
import { connect } from 'react-redux';
import NBA from 'nba';
import {} from '../../scss/teamColors.scss'
import axios from 'axios';

//Styling.
var nameStyle = {
    fontSize : 50,
    fontFamily : "Helvetica",
    padding : 15,
    color : "red",
    marginLeft: "3%"
}

class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            playerName : props.player,
            playerInfo : props.playerInfo,
            team: " "
        };

        this.getPlayerInfo = this.getPlayerInfo.bind(this);
    }

    /*
    *   Returns player info object based on player id.
    *
    *   @param player - The player name to information for.
    */
    getPlayerInfo(player){
        var player = NBA.findPlayer(player);
        if(player === undefined){
            alert("Could not find a player by that name");
        }
        else{
            return NBA.stats.playerInfo({ PlayerID: player.playerId });
        }
    }


    /*
    *   Called everytime the props are updated which
    *   in this case is everytime the redux state changes.
    *   or every time the user searches.
    *
    *   @param nextProps - The props that are about to be set.
    */
    componentWillReceiveProps(nextProps){
        if(this.props.player != nextProps.player){
            var info = this.getPlayerInfo(nextProps.player);
            Promise.resolve(info)
                .then((playerInfo) => {
                    if(playerInfo != undefined){
                        this.setState({
                            playerInfo: playerInfo.commonPlayerInfo[0],
                            team: playerInfo.commonPlayerInfo[0].teamAbbreviation
                        });
                    }
                }, (err) => {
                    console.warn(err);
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.playerInfo !== undefined){
            return true;
        }
        return false;
    }

    //Called everytime playerInfo state value is set.
    render(){
        if(this.state.playerInfo !== undefined){
            var url = "https://nba-players.herokuapp.com/players/" + this.state.playerInfo.lastName +"/" + this.state.playerInfo.firstName;
            return(
                <div>
                    <img src={url} alt="Player headshot" />
                    <h3 style={nameStyle}>{this.state.playerInfo.displayFirstLast} - {this.state.playerInfo.jersey} - {this.state.playerInfo.teamCity} {this.state.playerInfo.teamName} </h3>
                </div>
            )
        }
        return null;
    }
}


/*
*  Maps Redux state to component props.
*  Called everytime the redux state updates.
*  @param - the redux state object
*/
function mapStateToProps(state){
    return { player: state.playerReducer }
}

export default connect(mapStateToProps,null)(Card);
