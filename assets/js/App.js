'use-strict';

import React from 'react';
import Input from './components/Input';
import Info from './components/Info';

export default class App extends React.Component {

	render() {
		return(
			<div >
				<Input />
				<Info />
			</div>);
	}
}