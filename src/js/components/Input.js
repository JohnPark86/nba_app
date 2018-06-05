import React from 'react';
import store from '../redux/store';
import { FormGroup, FormControl } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addSearchParam } from '../redux/actions';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import NBA from 'nba';

var inputStyle = {
    width: '40%',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderWidth: 1,
    borderColor: '#000000'
};

var logo = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '6%'
};

class Input extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            player: '',
            options: this.props.playersList
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(value) {
        this.setState({ player: value });
        this.props.addSearchParam(this.state.player);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    componentDidMount() {
        var players = NBA.players;
        console.log(players);
        this.setState({
            options: NBA.players
        });
    }

    // getDerivedStatefromProps(props, state) {
    //     console.log('props: ', props);
    //     console.log('state: ', state);
    // }

    render() {
        return (
            <div>
                <img style={logo} src={require('../../img/logo.png')} />

                <Select
                    style={inputStyle}
                    id="state-select"
                    onBlurResetsInput={false}
                    onSelectResetsInput={false}
                    autoFocus
                    labelKey="fullName"
                    options={this.state.options}
                    clearable={this.state.clearable}
                    name="selected-state"
                    value={this.state.player}
                    onChange={this.handleChange}
                    searchable={this.state.searchable}
                />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addSearchParam }, dispatch);
}

export default connect(null, mapDispatchToProps)(Input);
