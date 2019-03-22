import React from "react";
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
                if (this.props.handleChange) {
                    this.props.handleChange(value.fullName);
                }
            }
        );
    }

    componentDidMount() {
        this.setState({
            options: NBA.players
        });
    }

    render() {
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

export default Input;
