"use-strict";

import React from "react";
import {} from "../../scss/teamColors.scss";
import Info from './Info';

//Styling.
const nameStyle = {
    fontSize: 50,
    fontFamily: "Helvetica"
};

const headshot = {
    width: "25vw"
}
const cardContainer = {
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    width: "90%",
    display: "flex",
    marginLeft: "5%"
};

const teamStyle = {
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
                            {this.state.playerInfo.displayFirstLast}
                            <img
                                src={require("../../img/team-logos/OKC.svg")}
                            />
                        </div>
                        <div style={teamStyle}>
                            {this.state.playerInfo.teamCity}{" "}
                            {this.state.playerInfo.teamName}
                            {this.state.playerInfo.jersey}{" "}
                        </div>
                    </div>
                    <Info info={this.props.info} team={this.props.team} />
                </div>
            );
        }
        return null;
    }
}
