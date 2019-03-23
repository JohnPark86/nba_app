"use-strict";

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
    width: "90%",
    marginLeft: "5%",
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

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        var player = NBA.findPlayer(value);
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

        return null;
    }

   

    render() {
        console.log(this.props.store.getState())
        if (this.state.player === undefined) {
            return (
                <div>
                    <Input handleChange={this.handleChange} />
                </div>
            );
        } else {
            return (
                <div>
                    <Input handleChange={this.handleChange} />
                    <Card
                        info={this.state.info}
                        player={this.state.player}
                        team={this.state.team}
                    />
                    <div style={outputcontainer}>
                        {/* <Info info={this.state.info} team={this.state.team} /> */}
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

export default App;
