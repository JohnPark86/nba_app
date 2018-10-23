"use-strict";

import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";
import NBA from "nba";
import React from "react";
import Input from "./components/Input";
import Info from "./components/Info";
import Card from "./components/Card";
import Averages from "./components/Averages";

var outputcontainer = {
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    width: "fit-content",
    marginLeft: "5%",
    display: "inline-block"
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team: " ",
            player: " ",
            playerList: [],
            averages: undefined,
            info: undefined
        };

        this.getInfo = this.getInfo.bind(this);
        this.getPlayerAverages = this.getPlayerAverages.bind(this);
    }

    /*
    *   Returns player info.
    *
    *   @param player - The player name to information for.
    */
    getInfo(player) {
        var player = NBA.findPlayer(player);
        if (player === undefined) {
            alert("Could not find a player by that name");
        } else {
            return NBA.stats.playerInfo({ PlayerID: player.playerId });
        }
    }

    getPlayerAverages(player) {
        var player = NBA.findPlayer(player);
        if (player !== undefined) {
            return NBA.stats.playerProfile({ PlayerID: player.playerId });
        }
    }

    /*
    *   Called everytime the props are updated which
    *   in this case is everytime the redux state changes.
    *   or every time the user searches.
    *
    *   @param nextProps - The props that are about to be set.
    */

    static getDerivedStateFromProps(props, state) {
        if (props.player != state.player) {
            var info = this.getInfo(nextProps.player);
            var averages = this.getPlayerAverages(nextProps.player);

            Promise.all([info, averages]).then(
                values => {
                    console.log(values);
                    if (values != undefined) {
                        return {
                            player:
                                values[0].commonPlayerInfo[0].displayFirstLast,
                            team:
                                values[0].commonPlayerInfo[0].teamAbbreviation,
                            averages: values[1],
                            info: values[0]
                        };
                    } else {
                        return null;
                    }
                },
                err => {
                    console.warn(err);
                }
            );
        }
        return null;
    }

    render() {
        console.log(this.state);
        return (
            <div>
                <Input />
                <Card player={this.state.player} team={this.state.team} />
                <div style={outputcontainer}>
                    <Info info={this.state.info} team={this.state.team} />
                    <Averages
                        averages={this.state.averages}
                        team={this.state.team}
                    />
                </div>
            </div>
        );
    }
}

/*
*  Maps Redux state to component props.
*  Called everytime the redux state updates.
*  @param - the redux state object
*/
function mapStateToProps(state) {
    return { player: state.playerReducer };
}

export default connect(
    mapStateToProps,
    null
)(App);
