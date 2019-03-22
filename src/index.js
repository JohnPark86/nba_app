'use-strict';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/App';
import { createStore } from 'redux';
import reducers from './js/redux/reducers'

let store = createStore(reducers)

ReactDOM.render(
	<App store={store} />, document.getElementById('root')
);