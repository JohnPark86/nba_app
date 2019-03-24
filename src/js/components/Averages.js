"use-strict";

import React from "react";
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { } from "../../scss/teamColors.scss";
import { } from "../../scss/util.scss";

export default class Averages extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			placeholder: "Please select a season",
			seasons: null,
			averages: props.averages
		};
	}



	componentDidMount() {
		this.setState({
			seasons: this.props.averages.seasonTotalsRegularSeason,
		});
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.averages !== this.props.averages) {
			
			this.setState({
				seasons: this.props.averages.seasonTotalsRegularSeason,
			});
		}
	}

	render() {

		if (this.state.seasons) {
			console.log(this.state)

			let columns = [{
				Header: 'Season',
				accessor: 'seasonId'
			},
			{
				Header: 'Team',
				accessor: 'teamAbbreviation'
			},
			{
				Header: 'Assists',
				accessor: 'ast'
			},
			{
				Header: 'Blocks',
				accessor: 'blk'
			},
			{
				Header: 'Rebounds (Def)',
				accessor: 'dreb'
			},
			{
				Header: 'Rebounds (Off)',
				accessor: 'oreb'
			},
			{
				Header: 'Rebounds (total)',
				accessor: 'reb'
			},
			{
				Header: 'Points',
				accessor: 'pts'
			},
			{
				Header: 'Field Goals',
				accessor: 'fgm'
			},
			{
				Header: '3 Pointers',
				accessor: 'fG3M'
			},
			{
				Header: 'Free Throws',
				accessor: 'ftm'
			},
			{
				Header: 'Games Played',
				accessor: 'gp'
			},
			{
				Header: 'Minutes Per Game',
				accessor: 'min'
			},
			{
				Header: 'Personal Fouls',
				accessor: 'pf'
			},
			{
				Header: 'Steals',
				accessor: 'stl'
			},
			{
				Header: 'Turnovers',
				accessor: 'tov'
			}];

			return (
				<ReactTable
					data={this.state.seasons}
					columns={columns}
					defaultPageSize={10}
					defaultSortDesc={true}
					resolveData={data => data.map(row => row)}
				/>
			);
		}
		return null;
	}
}
