/**
* ************************************
*
* @module  create store
* @author  jonnydodad
* @date    08/07/18
* @description returns function that when executed creates redux store.
*
* ************************************
*/
/**/

import { createStore, applyMiddleware, } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers';
import logger from './utils';
const middleware = [logger, reduxThunk];

const setupStore = () => {
	const store = createStore(
		reducers,
		applyMiddleware(...middleware),
	);

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			store.replaceReducer(require('../reducers/'));
		});
	}
	
	return store;
};

export default setupStore;
