import React from "react";
import store from "../redux/store";
import { FormGroup, FormControl } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { addSearchParam } from "../redux/actions";
import Select from "react-select";
import {} from "../../scss/bootstrap-overrides.scss";
import NBA from "nba";

var logo = {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    width: "6%"
};

class Input extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerObj: null,
            player: "",
            options: []
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(value) {
        this.setState(
            {
                playerObj: value,
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
        this.setState({
            options: NBA.players
        });
    }

    render() {
        console.log(this.state.options);
        return (
            <div className="input-area">
                <img style={logo} src={require("../../img/logo.png")} />
                <Select
                    id="input_select"
                    getOptionLabel={(option: {}) => option.fullName}
                    options={this.state.options}
                    value={this.state.playerObj}
                    onChange={this.handleChange}
                    searchable={this.state.searchable}
                    placeholder="Select an NBA player"
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
