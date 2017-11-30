import React from 'react';
import store from '../redux/store';
import { connect } from 'react-redux';

var nameStyle = {
	fontSize: 70,
	fontFamily: "Helvetica",
	padding: 50,
	color: "red"
}

class Info extends React.Component {
	
	constructor(props) {
    	super(props);
	}

	render(){
		return(
			<h2 style={nameStyle}>{this.props.player}</h2>
		)
	}
}

function mapStateToProps(state){
	return {
    	player: state.playerReducer
	}
}

export default connect(mapStateToProps,null)(Info);