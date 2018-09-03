import React from "react";
import store from "../redux/store";
import NBA from "nba";
import {} from "../../scss/teamColors.scss";

/*
*   Returns date formatted from ISO to 12-12-1234 .
*
*   @param d - The date in ISO format.
*/
const formatDate = d => {
    var date = new Date(d);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var dt = date.getDate();

    dt = dt < 10 ? "0" + dt : dt;
    month = month < 10 ? "0" + month : month;

    return month + "-" + dt + "-" + year;
};

export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerInfo: undefined
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
                    if (info != undefined) {
                        this.setState({
                            playerInfo: playerInfo.commonPlayerInfo[0]
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
            var birthDate = formatDate(this.state.playerInfo.birthdate);
            return (
                <div className="container">
                    <div className={this.props.team}>
                        <p>
                            <b>Position:</b> {this.state.playerInfo.position}
                        </p>
                        <p>
                            <b>Date Of Birth:</b> {birthDate}{" "}
                        </p>
                        <p>
                            <b>Height:</b> {this.state.playerInfo.height}
                        </p>
                        <p>
                            <b>Weight:</b> {this.state.playerInfo.weight}
                        </p>
                        <p>
                            <b>Seasons in league:</b>{" "}
                            {this.state.playerInfo.seasonExp}
                        </p>
                        <p>
                            <b>Draft Year:</b> {this.state.playerInfo.draftYear}
                        </p>
                        <p>
                            <b>Draft Round:</b>{" "}
                            {this.state.playerInfo.draftRound}
                        </p>
                        <p>
                            <b>Draft Number:</b>{" "}
                            {this.state.playerInfo.draftNumber}
                        </p>
                    </div>
                </div>
            );
        }
        return null;
    }
}
