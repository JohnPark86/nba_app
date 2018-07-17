'use-strict';

import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.css';
import NBA from 'nba';
import React from 'react';
import Input from './components/Input';
import Info from './components/Info';
import Card from './components/Card';
import Profile from './components/Profile';

var outputcontainer = {
    // borderColor : "black",
    // borderWidth : 1,
    // borderStyle : "solid",
    width: 'fit-content',
    marginLeft: '5%',
    display: 'inline-block'
};

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            team: ' ',
            player: ' ',
            playerList: []
        };

        this.getInfo = this.getInfo.bind(this);
    }

    /*
    *   Returns player info.
    *
    *   @param player - The player name to information for.
    */
    getInfo(player) {
        var player = NBA.findPlayer(player);
        if (player === undefined) {
            alert('Could not find a player by that name');
        } else {
            return NBA.stats.playerInfo({ PlayerID: player.playerId });
        }
    }

    /*
    *   Called everytime the props are updated which
    *   in this case is everytime the redux state changes.
    *   or every time the user searches.
    *
    *   @param nextProps - The props that are about to be set.
    */
    componentWillReceiveProps(nextProps) {
        if (this.props.player != nextProps.player) {
            var info = this.getInfo(nextProps.player);
            Promise.resolve(info).then(
                playerInfo => {
                    if (info != undefined) {
                        this.setState({
                            player: playerInfo.commonPlayerInfo[0].displayFirstLast,
                            team: playerInfo.commonPlayerInfo[0].teamAbbreviation
                        });
                    }
                },
                err => {
                    console.warn(err);
                }
            );
        }
    }

    render() {
        return (
            <div>
                <Input />
                <Card player={this.state.player} team={this.state.team} />
                <div style={outputcontainer}>
                    <Info player={this.state.player} team={this.state.team} />
                    <Profile player={this.state.player} team={this.state.team} />
                </div>
            </div>
        );
    }
}

/*
*  Maps Redux state to component props.
*  Called everytime the redux state updates.
*  @param - the redux state object
*/
function mapStateToProps(state) {
    return { player: state.playerReducer };
}

export default connect(mapStateToProps, null)(App);
