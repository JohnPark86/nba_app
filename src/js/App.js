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
            team: undefined,
            player: undefined,
            averages: undefined,
            info: undefined
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.player !== this.props.player && this.props.player) {
            var player = NBA.findPlayer(this.props.player);
            if (player === undefined) {
                alert("Could not find a player by that name");
            } else {
                var info = NBA.stats.playerInfo({ PlayerID: player.playerId });
                var averages = NBA.stats.playerProfile({
                    PlayerID: player.playerId
                });

                Promise.all([info, averages]).then(
                    values => {
                        if (values != undefined) {
                            this.setState({
                                player:
                                    values[0].commonPlayerInfo[0]
                                        .displayFirstLast,
                                team:
                                    values[0].commonPlayerInfo[0]
                                        .teamAbbreviation,
                                averages: values[1],
                                info: values[0]
                            });
                        } else {
                            return null;
                        }
                    },
                    err => {
                        console.warn(err);
                    }
                );
            }
        }
        return null;
    }

    render() {
        if (this.state.player === undefined) {
            return (
                <div>
                    <Input />
                </div>
            );
        } else {
            return (
                <div>
                    <Input />
                    <Card
                        info={this.state.info}
                        player={this.state.player}
                        team={this.state.team}
                    />
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
