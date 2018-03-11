'use-strict';

import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import Input from './components/Input';
import Info from './components/Info';
import Card from './components/Card';
import Profile from './components/Profile';

var outputcontainer = {
    // borderColor : "black",
    // borderWidth : 1,
    // borderStyle : "solid",
    width : "80%",
    marginLeft : "5%",
    display: "inline-block"
}

export default class App extends React.Component {

	render() {
		return(
			<div>
				<Input />
                <Card />
                    <div style={outputcontainer}>

                        <Info />
                        <Profile />
                    </div>
			</div>);
	}
}
