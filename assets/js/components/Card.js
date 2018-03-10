import React from 'react';
import store from '../redux/store';
import { connect } from 'react-redux';
import NBA from 'nba';
import {} from '../../scss/teamColors.scss'


//Styling.
var nameStyle = {
    fontSize : 50,
    fontFamily : "Helvetica",
    padding : 15,
    color : "red",
    marginLeft: "3%"
}

var container = {
    borderColor : "black",
    borderWidth : 1,
    borderStyle : "solid",
    width : "fit-content",
    fontSize : 18,
    lineHeight : 1,
    float: "left",
    marginLeft: "3%",
    padding: "1%"
}


class Card extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            playerName : props.player,
            playerInfo : props.playerInfo,
            playerProfile : props.playerProfile,
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
                    if(info != undefined){
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
            return(
                <div>
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
