import React from 'react';
import store from '../redux/store';
import { FormGroup, FormControl } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addSearchParam } from '../redux/actions';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import {} from '../../scss/bootstrap-overrides.scss';
import NBA from 'nba';

var logo = {
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: '6%'
};

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            player: '',
            options: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        //this.setState({ player: value.fullName });
        this.setState(
            {
                player: value.fullName
            },
            () => {
                if (this.props.addSearchParam) {
                    this.props.addSearchParam(value.fullName);
                }
            }
        );
    }

    componentDidMount() {
        var players = NBA.players;
        console.log(players);
        this.setState({
            options: NBA.players
        });
    }

    render() {
        return (
            <div>
                <img style={logo} src={require('../../img/logo.png')} />
                <Select
                    id="input_select"
                    autoFocus
                    labelKey="fullName"
                    options={this.state.options}
                    clearable={this.state.clearable}
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

export default connect(
    null,
    mapDispatchToProps
)(Input);
