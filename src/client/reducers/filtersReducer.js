/**
* ************************************
*
* @module  content reducer
* @author  jonnydodad
* @date    08/07/18
* @description sets item content in state after its fetched.
*
* ************************************
*/
/**/

//import { combineReducers } from 'redux';
import Immutable, { Record, List } from 'immutable';
import * as types from '../actions/actionTypes';

const InitialState = new Record({
	
	filtered: [],

 	filters: {
 		hi: 'bye'
 	}
}, 'InitialState');

const filtersReducer = (state = InitialState(), {
	type,
	filtered,
	error,
	loaded
	}) => {

	switch (type) {
	case types.ERROR:
		return state.merge({
			error,
			loaded,
		})
	case types.SET_CONTENT:
		console.log('hiiiiiiii',state.toString())
	default:
		return state;
	}
};

export default filtersReducer;
