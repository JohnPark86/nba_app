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
			season: undefined,
			seasons: undefined,
			value: null,
			playerProfile: null
		};
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(value) {
		this.setState({
			playerProfile: value,
			season: value.seasonId
		});
	}

	static getDerivedStateFromProps(props, state) {
		if (props.averages !== undefined) {
			let target = props.averages.seasonTotalsRegularSeason.length - 1;
			return {
				seasons: props.averages.seasonTotalsRegularSeason,
				playerProfile: props.averages.seasonTotalsRegularSeason[target],
				season:
					props.averages.seasonTotalsRegularSeason[target].seasonId
			};
		}
		return null;
	}

	render() {
		if (this.state.playerProfile !== null) {
			var mapped = this.state.seasons.map(s => {
				return {
					...s,
					info: `${s.seasonId} (${s.teamAbbreviation})`
				};
			});
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
								<b>Assists:</b> {this.state.playerProfile.ast}
							</p>
							<p>
								<b>Blocks:</b> {this.state.playerProfile.blk}{" "}
							</p>
							<p>
								<b>Rebounds (Def): </b>
								{this.state.playerProfile.dreb}
							</p>
							<p>
								<b>Rebounds (Off): </b>
								{this.state.playerProfile.oreb}
							</p>
							<p>
								<b>Rebounds (total): </b>
								{this.state.playerProfile.reb}
							</p>
							<p>
								<b>Points: </b>
								{this.state.playerProfile.pts}{" "}
							</p>
							<p>
								<b>Field Goals: </b>
								{this.state.playerProfile.fgm} /{" "}
								{this.state.playerProfile.fga}
								&nbsp;({this.state.playerProfile.fgPct}%)
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
								{this.state.playerProfile.fG3M} /{" "}
								{this.state.playerProfile.fG3A}
								&nbsp;({this.state.playerProfile.fg3Pct}%)
							</p>
							<p>
								<b>Free Throws: </b>
								{this.state.playerProfile.ftm} /{" "}
								{this.state.playerProfile.fta}
								&nbsp;({this.state.playerProfile.ftPct}%)
							</p>
							<p>
								<b>Games Played: </b>
								{this.state.playerProfile.gp}{" "}
							</p>
							<p>
								<b>Minutes Per Game: </b>
								{this.state.playerProfile.min}{" "}
							</p>
							<p>
								<b>Personal Fouls: </b>
								{this.state.playerProfile.pf}{" "}
							</p>
							<p>
								<b>Steals: </b>
								{this.state.playerProfile.stl}{" "}
							</p>
							<p>
								<b>Turnovers: </b>
								{this.state.playerProfile.tov}{" "}
							</p>
						</div>
					</div>
				</div>
			);
		}
		return null;
	}
}
