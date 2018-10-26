"use-strict";

import React from "react";
import store from "../redux/store";
import NBA from "nba";
import {} from "../../scss/teamColors.scss";
import Select from "react-select";
import "react-select/dist/react-select.css";

var profileStyle = {
	float: "left",
	width: "50%"
};

export default class Averages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			placeholder: "Please select a season",
			season: null,
			seasons: null
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(value) {
		console.log(value);
		this.setState({
			season: value
		});
	}

	componentDidMount() {
		let target = this.props.averages.seasonTotalsRegularSeason.length - 1;
		this.setState({
			seasons: this.props.averages.seasonTotalsRegularSeason,
			season: this.props.averages.seasonTotalsRegularSeason[target]
		});
	}

	render() {
		console.log("avg: ", this.state);
		if (this.state.season) {
			let mapped = this.state.seasons.map(s => {
				return {
					...s,
					info: `${s.seasonId} (${s.teamAbbreviation})`
				};
			});
			console.log(mapped);
			return (
				<div className="container">
					<div
						className={this.props.team}
						style={{ display: "inline-block" }}
					>
						<div style={profileStyle}>
							<p>
								<u>
									<b>Season Averages</b>
								</u>
							</p>
							<p>
								<b>Assists:</b> {this.state.season.ast}
							</p>
							<p>
								<b>Blocks:</b> {this.state.season.blk}{" "}
							</p>
							<p>
								<b>Rebounds (Def): </b>
								{this.state.season.dreb}
							</p>
							<p>
								<b>Rebounds (Off): </b>
								{this.state.season.oreb}
							</p>
							<p>
								<b>Rebounds (total): </b>
								{this.state.season.reb}
							</p>
							<p>
								<b>Points: </b>
								{this.state.season.pts}{" "}
							</p>
							<p>
								<b>Field Goals: </b>
								{this.state.season.fgm} /{" "}
								{this.state.season.fga}
								&nbsp;({this.state.season.fgPct}%)
							</p>
						</div>
						<div style={profileStyle}>
							<Select
								id="season"
								autoFocus
								options={mapped}
								labelKey="info"
								value={this.state.season}
								onChange={this.handleChange}
								placeholder={mapped[mapped.length - 1].info}
							/>
							<p>
								<b>3 Pointers: </b>
								{this.state.season.fG3M} /{" "}
								{this.state.season.fG3A}
								&nbsp;({this.state.season.fg3Pct}%)
							</p>
							<p>
								<b>Free Throws: </b>
								{this.state.season.ftm} /{" "}
								{this.state.season.fta}
								&nbsp;({this.state.season.ftPct}%)
							</p>
							<p>
								<b>Games Played: </b>
								{this.state.season.gp}{" "}
							</p>
							<p>
								<b>Minutes Per Game: </b>
								{this.state.season.min}{" "}
							</p>
							<p>
								<b>Personal Fouls: </b>
								{this.state.season.pf}{" "}
							</p>
							<p>
								<b>Steals: </b>
								{this.state.season.stl}{" "}
							</p>
							<p>
								<b>Turnovers: </b>
								{this.state.season.tov}{" "}
							</p>
						</div>
					</div>
				</div>
			);
		}
		return null;
	}
}
