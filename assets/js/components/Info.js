import React from 'react';
import store from '../redux/store';
import { connect } from 'react-redux';
import NBA from 'nba';

var nameStyle = {
	fontSize: 70,
	fontFamily: "Helvetica",
	padding: 50,
	color: "red"
}

class Info extends React.Component {
	
	constructor(props) {
    	super(props);
    	this.state={
    		playerName : props.player

    	};
	}

	render(){
		return(
			<div>
				<h2 style={nameStyle}>{NBA.findPlayer(this.props.player).firstName}</h2>
				<h3 style={nameStyle}>{NBA.findPlayer(this.props.player).lastName}</h3>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {
    	player: state.playerReducer
	}
}

export default connect(mapStateToProps,null)(Info);