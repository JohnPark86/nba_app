import React from 'react';
import store from '../redux/store';
import { FormGroup, FormControl } from 'react-bootstrap'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import { addSearchParam } from '../redux/actions';


var inputStyle = {
    width: "70%",
    margin: "3%",
    borderWidth: 1,
    borderColor: '#000000',
}

class Input extends React.Component {

	constructor(props) {
    super(props);
    this.state = {player: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({player: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addSearchParam(this.state.player);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
          <FormGroup bsSize="large">
              <FormControl
                type="text"
                style={inputStyle}
                value={this.state.player}
                onChange={this.handleChange}
                placeholder="Please Enter the Name of an NBA Player"
              />
          </FormGroup>
        </form>
    );
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({addSearchParam}, dispatch);
}

export default connect(null, mapDispatchToProps)(Input);





