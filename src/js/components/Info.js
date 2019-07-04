"use-strict";

import React, { useState , useEffect} from 'react';
import { } from "../../scss/teamColors.scss";

const info_container = {
    fontSize: "18px",
    flexGrow: "3"
}

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

const Info = (props) => {
 
 const [playerInfo, setPlayerInfo] = useState(props.info.commonPlayerInfo[0]) 
   
    if (playerInfo !== undefined) {
        var birthDate = formatDate(playerInfo.birthdate);
        return (
            <div style={info_container}>
                <div>
                    <p>
                        <b>Position:</b> {playerInfo.position}
                    </p>
                    <p>
                        <b>Date Of Birth:</b> {birthDate}{" "}
                    </p>
                    <p>
                        <b>Height:</b> {playerInfo.height}
                    </p>
                    <p>
                        <b>Weight:</b> {playerInfo.weight}
                    </p>
                    <p>
                        <b>Seasons in league:</b>{" "}
                        {playerInfo.seasonExp}
                    </p>
                    <p>
                        <b>Draft Year:</b> {playerInfo.draftYear}
                    </p>
                    <p>
                        <b>Draft Round:</b>{" "}
                        {playerInfo.draftRound}
                    </p>
                    <p>
                        <b>Draft Number:</b>{" "}
                        {playerInfo.draftNumber}
                    </p>
                </div>
            </div>
        );
    }
    else { return null; }
}

export default Info;