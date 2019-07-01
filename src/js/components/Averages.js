"use-strict";

import React, { useState , useEffect} from 'react';
import ReactTable from "react-table";
import 'react-table/react-table.css'
import { } from "../../scss/teamColors.scss";
import { } from "../../scss/util.scss";

const Averages = (props) => {

	const [placeholder, setPlaceholder] = useState('Please Select a Season');
	const [seasons, setSeasons] = useState(null)
	const [averages, setAverages] = useState(props.averages)
	
	useEffect( () => {
		setSeasons(props.averages.seasonTotalsRegularSeason.reverse())
	},[props.averages])
	
	if (seasons) {
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
				data={seasons}
				columns={columns}
				defaultPageSize={10}
				resolveData={data => data.map(row => row)}
			/>
		);
	}
	else{ return null; }
}

export default Averages;