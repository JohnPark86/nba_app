"use-strict";

import "bootstrap/dist/css/bootstrap.css";
import NBA from "nba";
import React, { useState , useEffect} from 'react';
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

const App = () => {
    
    const [team, setTeam] = useState(undefined);
    const [averages, setAverages] = useState(undefined);
    const [info, setInfo] = useState(undefined);
    const [player, setPlayer] = useState(undefined);
    
    const handleChange = (value) => {
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
                            setTeam(values[0].commonPlayerInfo[0].teamAbbreviation)
                            setAverages(values[1]);
                            setInfo(values[0]);
                            setPlayer(values[0].commonPlayerInfo[0].displayFirstLast);
                    } else {
                        return null;
                    }
                },
                err => {
                    console.warn(err);
                }       
            )
        }
    }

    if (player === undefined) {   
        return (
            <div>
                <Input handleChange={handleChange} />
            </div>
        );
    }
    else{
        return (
            <div>
                <Input handleChange={handleChange} />
                <Card
                    info={info}
                    player={player}
                    team={team}
                />
                <div style={outputcontainer}>
                    {/* <Info info={this.state.info} team={this.state.team} /> */}
                    <Averages
                        averages={averages}
                        team={team}
                    />
                </div>
            </div>
        );
    }
}

export default App;