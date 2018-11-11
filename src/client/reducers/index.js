/**
* ************************************
*
* @module  combine reducers
* @author  jonnydodad
* @date    08/07/18
* @description simply a place to combine reducers.
*
* ************************************
*/
/**/

import { combineReducers } from 'redux';
import contentReducer from './contentReducer';
//import filtersReducer from './filtersReducer';

export default combineReducers({
	contentReducer,
	//filtersReducer,
});

