"use-strict";

import React from "react";
import { } from "../../scss/teamColors.scss";


const info_container = {
    width: fit-content;
    height: fit-content;
    font-size: 22px;
    float: left;
    padding: 0;
    display: flex;
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

export default class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerInfo: props.info.commonPlayerInfo[0]
        };
    }



    render() {
        if (this.state.playerInfo !== undefined) {
            var birthDate = formatDate(this.state.playerInfo.birthdate);
            return (
                <div styling={info_container}>
                    <div>
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
                    </div>
                    <div>
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
