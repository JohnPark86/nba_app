import React from 'react';
import store from '../redux/store';
import { connect } from 'react-redux';
import NBA from 'nba';
import {} from '../../scss/teamColors.scss'

//Styling.
var nameStyle = {
    fontSize : 50,
    fontFamily : "Helvetica",
    padding : 15,
    color : "red"
}

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            playerName : props.player,
            playerProfile : props.playerProfile,
            team : " "
        };

        this.getPlayerProfile = this.getPlayerProfile.bind(this);
    }

    getPlayerProfile(player){
        var player = NBA.findPlayer(player);
        if(player !== undefined){
            return NBA.stats.playerProfile({ PlayerID: player.playerId });
        }
    }

    //place initialization code here
    componentDidMount() {
        if(this.props.player != ""){
            var info = this.getPlayerProfile(this.props.player);
            Promise.resolve(profile)
                .then( (playerProfile) => {
                    this.setState({
                         playerProfile : playerProfile,
                         team : playerProfile.teamAbbreviation
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
            var pro = this.getPlayerProfile(nextProps.player);
            Promise.resolve(pro)
                .then((playerProfile) => {
                    if(playerProfile !== undefined){
                        console.log("pp: ", playerProfile)
                        var target = playerProfile.seasonTotalsRegularSeason.length -1;
                        this.setState({
                            playerProfile : playerProfile.seasonTotalsRegularSeason[target],
                            team : playerProfile.seasonTotalsRegularSeason[target].teamAbbreviation
                        });
                    }
                }, (err) => {
                    console.warn(err);
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState){
        if(nextState.playerProfile !== undefined){
            return true;
        }
        return false;
    }

    //Called everytime playerInfo state value is set.
    render(){
        if(this.state.playerProfile !== undefined){
            return(
                <div style={{"display":"inline-block"}} className={this.state.team}>
                    <div style={{"float":"left"}}>
                        <p><u>Current Season Averages</u></p>
                        <p><b>Assists:</b>  {this.state.playerProfile.ast}</p>
                        <p><b>Blocks:</b> {this.state.playerProfile.blk} </p>
                        <p><b>Rebounds (Def):</b> {this.state.playerProfile.dreb}</p>
                        <p><b>Rebounds (Off):</b> {this.state.playerProfile.oreb}</p>
                        <p><b>Rebounds (total):</b> {this.state.playerProfile.reb}</p>
                        <p><b>Points:</b> {this.state.playerProfile.pts} </p>
                        <p><b>Field Goals:</b> {this.state.playerProfile.fgm} / {this.state.playerProfile.fga}
                                          &nbsp;({this.state.playerProfile.fgPct}%)</p>
                    </div>
                    <div style={{"float":"left"}}>
                        <p><b>3 Pointers:</b> {this.state.playerProfile.fG3M} / {this.state.playerProfile.fG3A}
                                          &nbsp;({this.state.playerProfile.fg3Pct}%)</p>
                        <p><b>Free Throws:</b> {this.state.playerProfile.ftm} / {this.state.playerProfile.fta}
                                          &nbsp;({this.state.playerProfile.ftPct}%)</p>
                        <p><b>Games Played:</b> {this.state.playerProfile.gp} </p>
                        <p><b>Minutes Per Game:</b> {this.state.playerProfile.min} </p>
                        <p><b>Personal Fouls:</b> {this.state.playerProfile.pf} </p>
                        <p><b>Steals:</b> {this.state.playerProfile.stl} </p>
                        <p><b>Turnovers:</b> {this.state.playerProfile.tov} </p>
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

export default connect(mapStateToProps,null)(Profile);
