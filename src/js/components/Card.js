import React from "react";
import store from "../redux/store";
import { connect } from "react-redux";
import NBA from "nba";
import {} from "../../scss/teamColors.scss";

//Styling.
var nameStyle = {
    fontSize: 50,
    fontFamily: "Helvetica",
    color: "red"
};

var cardContainer = {
    display: "inline-block",
    marginLeft: "5%"
};

var headshot = {
    width: "35%",
    float: "left"
};

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: props.player,
            playerInfo: undefined,
            team: props.team
        };

        this.getPlayerInfo = this.getPlayerInfo.bind(this);
    }

    /*
    *   Returns player info object based on player id.
    *
    *   @param player - The player name to information for.
    */
    getPlayerInfo(player) {
        var player = NBA.findPlayer(player);
        if (player === undefined) {
            alert("Could not find a player by that name");
        } else {
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
    componentWillReceiveProps(nextProps) {
        if (this.props.player != nextProps.player) {
            var info = this.getPlayerInfo(nextProps.player);
            Promise.resolve(info).then(
                playerInfo => {
                    if (playerInfo != undefined) {
                        this.setState({
                            playerInfo: playerInfo.commonPlayerInfo[0],
                            team: this.props.team,
                            playerName: this.props.player
                        });
                    }
                },
                err => {
                    console.warn(err);
                }
            );
        }
    }

    //Called everytime playerInfo state value is set.
    render() {
        if (this.state.playerInfo !== undefined) {
            var url =
                "https://nba-players.herokuapp.com/players/" +
                this.state.playerInfo.lastName +
                "/" +
                this.state.playerInfo.firstName;
            return (
                <div style={cardContainer}>
                    <img style={headshot} src={url} alt="Player headshot" />
                    <h3 style={nameStyle}>
                        {this.state.playerInfo.displayFirstLast} -{" "}
                        {this.state.playerInfo.jersey} -{" "}
                        {this.state.playerInfo.teamCity}{" "}
                        {this.state.playerInfo.teamName}{" "}
                    </h3>
                </div>
            );
        }
        return null;
    }
}
