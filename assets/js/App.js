'use-strict';

import React from 'react';
import Input from './components/Input';
import Info from './components/Info';
import Profile from './components/Profile';

export default class App extends React.Component {

	render() {
		return(
			<div>
				<Input />
                <Info />
                <Profile />
			</div>);
	}
}
