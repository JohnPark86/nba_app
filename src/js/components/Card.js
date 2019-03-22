"use-strict";

import React from "react";
import {} from "../../scss/teamColors.scss";

//Styling.
var nameStyle = {
    fontSize: 50,
    fontFamily: "Helvetica"
};

var cardContainer = {
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    width: "80%",
    display: "inline-block",
    marginLeft: "5%"
};

var headshot = {
    width: "35%",
    float: "left"
};

var teamStyle = {
    fontSize: 40
};

export default class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerName: props.player,
            playerInfo: props.info.commonPlayerInfo[0],
            team: props.team
        };
    }

    componentDidUpdate(props, state) {
        if (this.props.info != props.info) {
            this.setState({
                playerInfo: this.props.info.commonPlayerInfo[0],
                team: this.props.team,
                playerName: this.props.player
            });
        }
    }

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
                    <div>
                        <div style={nameStyle}>
                            {this.state.playerInfo.jersey}{" "}
                            {this.state.playerInfo.displayFirstLast}
                        </div>

                        <div style={teamStyle}>
                            <img
                                src={require("../../img/team-logos/OKC.svg")}
                            />
                            {this.state.playerInfo.teamCity}{" "}
                            {this.state.playerInfo.teamName}
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    }
}
