"use-strict";

import React, { useState , useEffect} from 'react';
import {} from "../../scss/teamColors.scss";
import Info from './Info';

//Styling.
const nameStyle = {
    fontSize: 42,
};

const headshot = {
    flexGrow: "1"
}
const cardContainer = {
    // borderColor: "black",
    // borderWidth: 1,
    // borderStyle: "solid",
    display: "flex",
    margin: "5% 5% 0% 5%",
};

const teamStyle = {
    fontSize: 34
};

const card_info = {
    flexGrow: "2"
}

const Card = (props) => {

    const [playerName, setPlayerName] = useState(props.player)
    const [playerInfo, setPlayerInfo] = useState(props.info)
    const [playerTeam, setTeam] = useState(props.team)

    useEffect( () => {
        setPlayerName(props.player)
        setTeam(props.team)
        setPlayerInfo(props.info)
    }, [props]);

    if (playerInfo !== undefined) {
        console.log(playerTeam)
        let url =
            "https://nba-players.herokuapp.com/players/" +
            playerInfo.commonPlayerInfo[0].lastName +
            "/" +
            playerInfo.commonPlayerInfo[0].firstName;
        return (
            <div style={cardContainer}>
                <img style={headshot} src={url} alt="Player headshot" />
                <div style={card_info}>
                    <div style={nameStyle}>
                        {playerInfo.commonPlayerInfo[0].displayFirstLast}
                        <img
                            src={require("../../img/team-logos/" + playerTeam + ".svg")}
                        />
                    </div>
                    <div style={teamStyle}>
                        {playerInfo.commonPlayerInfo[0].teamCity}{" "}
                        {playerInfo.commonPlayerInfo[0].teamName}
                        {'\u00A0'}
                        {'\u00A0'}
                        {playerInfo.commonPlayerInfo[0].jersey}{" "}
                    </div>
                </div>
                <Info info={playerInfo} team={playerTeam} />
            </div>
        );
    }
    return null;
}

export default Card;

