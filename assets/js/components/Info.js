import React from 'react';
import store from '../redux/store';
import { connect } from 'react-redux';
import NBA from 'nba';

//Styling.
var nameStyle = {
	fontSize : 50,
	fontFamily : "Helvetica",
	padding : 15,
	color : "red",
    marginLeft: "3%"
}

var container = {
    borderColor : "black",
    borderWidth : 1,
    borderStyle : "solid",
    width : "fit-content",
    fontSize : 18,
    lineHeight : 1,
    float: "left",
    marginLeft: "3%",
    padding: "1%"
}

/*
*   Returns player info object based on player id.
*
*   @param player - The player name to information for.
*/
const getPlayerInfo = (player) => {
	var player = NBA.findPlayer(player);
    return NBA.stats.playerInfo({ PlayerID: player.playerId });
}

/*
*   Returns date formatted from ISO to 12-12-1234 .
*
*   @param d - The date in ISO format.
*/
const formatDate = (d) => {
    var date = new Date(d);
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var dt = date.getDate();

    dt = dt < 10 ? '0' + dt : dt;
    month = month < 10 ? '0' + month : month;

    return(month +'-'+ dt +'-'+ year);
}

class Info extends React.Component {

	constructor(props) {
    	super(props);
    	this.state={
    		playerName : props.player,
            playerInfo : props.playerInfo,
            playerProfile : props.playerProfile
    	};
	}

    //place initialization code here
    componentDidMount() {
        if(this.props.player != ""){
            var info = getPlayerInfo(this.props.player);
            Promise.resolve(info)
                .then((playerInfo) => {
                    this.setState({
                         playerInfo
                    });
                }, (err) => {
                    console.warn(err);
            });
        }
    }

    /*
    *   Called everytime the props are updated which
    *   in this case is everytime the redux state changes.
    *   or every time the user searches.
    *
    *   @param nextProps - The props that are about to be set.
    */
    componentWillReceiveProps(nextProps){
        if(this.props.player != nextProps.player){
            var info = getPlayerInfo(nextProps.player);
            Promise.resolve(info)
                .then((playerInfo) => {
                    this.setState({
                         playerInfo: playerInfo.commonPlayerInfo[0]
                    });
                }, (err) => {
                    console.warn(err);
            });
        }
    }

    //Called everytime playerInfo state value is set.
	render(){
        console.log("info: ", this.state.playerInfo)
        if(this.state.playerInfo != undefined){
            var birthDate = formatDate(this.state.playerInfo.birthdate);
            return(
    			<div>
    				<h3 style={nameStyle}>{this.state.playerInfo.displayFirstLast} - {this.state.playerInfo.jersey} - {this.state.playerInfo.teamCity} {this.state.playerInfo.teamName} </h3>
                    <div style={container}>
                        <p><b>Position:</b>  {this.state.playerInfo.position}</p>
                        <p><b>Date Of Birth:</b> {birthDate} </p>
                        <p><b>Height:</b>  {this.state.playerInfo.height}</p>
                        <p><b>Weight:</b>  {this.state.playerInfo.weight}</p>
                        <p><b>Seasons in league:</b>  {this.state.playerInfo.seasonExp}</p>
                        <p><b>Draft Year:</b>  {this.state.playerInfo.draftYear}</p>
                        <p><b>Draft Round:</b>  {this.state.playerInfo.draftRound}</p>
                        <p><b>Draft Number:</b>  {this.state.playerInfo.draftNumber}</p>
                    </div>
                </div>
    		)
        }
        return null;
	}
}


/*
*  Maps Redux state to component props.
*  Called everytime the redux state updates.
*  @param - the redux state object
*/
function mapStateToProps(state){
	return { player: state.playerReducer }
}

export default connect(mapStateToProps,null)(Info);
