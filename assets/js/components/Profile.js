import React from 'react';
import store from '../redux/store';
import { connect } from 'react-redux';
import NBA from 'nba';

//Styling.
var nameStyle = {
    fontSize : 50,
    fontFamily : "Helvetica",
    padding : 15,
    color : "red"
}

var container = {
    borderColor : "black",
    borderWidth : 1,
    borderStyle : "solid",
    width : "fit-content",
    fontSize : 18,
    lineHeight : 1,
    float: "left"
}

const getPlayerProfile = (player) => {
    var player = NBA.findPlayer(player);
    //console.log(NBA.stats.playerProfile({ PlayerID: player.playerId }));
    return NBA.stats.playerProfile({ PlayerID: player.playerId });
}


class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            playerName : props.player,
            playerProfile : props.playerProfile
        };
    }

    //place initialization code here
    componentDidMount() {
        if(this.props.player != ""){
            var info = getPlayerProfile(this.props.player);
            Promise.resolve(profile)
                .then((playerProfile) => {
                    this.setState({
                         playerProfile
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
            var pro = getPlayerProfile(nextProps.player);
            Promise.resolve(pro)
                .then((playerProfile) => {
                    this.setState({
                         playerProfile
                    });
                }, (err) => {
                    console.warn(err);
            });
        }
    }

    //Called everytime playerInfo state value is set.
    render(){
        if(this.state.playerProfile != undefined){
            var birthDate;
            // var birthDate = formatDate(this.state.playerInfo.birthdate);
            //getInfo(this.props.player)
            // console.log(NBA)
            return(
                <div style={container}>
                    <h3 style={nameStyle}>player profile</h3>
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

export default connect(mapStateToProps,null)(Profile);
