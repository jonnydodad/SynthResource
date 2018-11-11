/**
* ************************************
*
* @module  index
* @author  jonnydodad
* @date    08/07/18
* @description entry point for react app
*
* ************************************
*/

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
//import './index.scss';
import Store from './store';

const store = Store();

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
  	document.getElementById('root'),
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
