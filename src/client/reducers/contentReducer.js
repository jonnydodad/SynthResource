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
import Immutable, { Record, List, Map } from 'immutable';
import * as types from '../actions/actionTypes';

const getFiltered = (items, newFilters, action) => {

  return items.filter(item => {
		let match = true;

		newFilters.forEach((val, key) => {
			if (key === 'make' || key === 'model' || key === 'year' || key === 'polyphony') {
				if (val !== 'ALL' && val !== item.get(key)){
					match = false
				}
			}
			else if (val && item.has(key) && !item.get(key) ){			
				match = false;
			}
			else if (val && !item.has(key)){
				match = false;
			}
		})

		return match;
	})
}

const InitialState = new Record({
	items: new List(),
	models: new List(),
	filtered: new List(),
	years: Map(),
	manufacturers: Map(),
	polyphonys: Map(),
	currentImg: null,
	text: null,
 	error: null,
 	loaded: false,
 	filters: Map({
		make: 'ALL',
		model: 'ALL',
		year: 'ALL',
		polyphony: 'ALL',
		module: false,
		software: false,
		hardware: false,
		kybrd: false,
		rack: false,
		desktop: false,
		workstation: false,
		grooveBox: false,
		sampler: false,
		sequencer: false,
		arpeggiator: false,
		multitimbral: false,
		midi:false,
		dinsync:false,
		_frequency_modulation: false,
		_phase_distortion: false
 	})
}, 'InitialState');

const contentReducer = (state = InitialState(), {
	type,
	items,
	error,
	loaded,
	radioEvent,
	selectEvent,
	rowDataImg,
	rowDataText
	}) => {
	switch (type) {
		/////////////////////////////////////////////////////////////
		case types.ERROR:
			return state.merge({
				error,
				loaded,
			})
		/////////////////////////////////////////////////////////////
		case types.CHANGE_IMG:
			return state.merge({
				currentImg: rowDataImg,
				text:rowDataText
			})
		/////////////////////////////////////////////////////////////
		case types.HANDLE_RADIO_EVENT:
			//const radioField = radioEvent.target.value;
	    const	newFieldValue = !state.getIn([ 'filters', radioEvent.target.value ]);
	    const newFilters = state.setIn([ 'filters', radioEvent.target.value ], newFieldValue).get('filters');
	    const filtered = getFiltered(state.get('items'), newFilters)
	    
			return state.merge({
				filtered: filtered,
				filters: newFilters,
				text: filtered.first() ? filtered.first().get('text') : null,
				currentImg: filtered.first() ? filtered.first().get('img') : 'https://cdn.dribbble.com/users/1554526/screenshots/3399669/no_results_found.png'
			})
		/////////////////////////////////////////////////////////////
		case types.HANDLE_SELECT_EVENT:
			
			let newFiltersSelect = state.setIn(['filters', selectEvent.target.id], selectEvent.target.value).get('filters');

			if (selectEvent.target.id === 'make' || selectEvent.target.id === 'year' || selectEvent.target.id === 'polyphony'){
				newFiltersSelect = newFiltersSelect.set('model', 'ALL');
			}

	    const filteredSelect = getFiltered(state.get('items'), newFiltersSelect);

			return state.merge({
				filtered: filteredSelect,
				filters: newFiltersSelect,
				models: selectEvent.target.id === 'make' ? state.getIn(['manufacturers', selectEvent.target.value]) : state.get('models'),
				text: filteredSelect.first() ? filteredSelect.first().get('text') : null,
				currentImg: filteredSelect.first() ? filteredSelect.first().get('img') : 'https://cdn.dribbble.com/users/1554526/screenshots/3399669/no_results_found.png'
			})
		/////////////////////////////////////////////////////////////
		case types.SET_CONTENT:	
			let newList = [];
			let years = {ALL: 'ALL'};
			let polyphonys = {ALL: 'ALL'};
			let manufacturers = {ALL:['ALL']};	

			//convert Array of Objects to Array of Maps and build up manufactures Object
			items.forEach(item => {	
				years[item.year] = true;
				polyphonys[item.polyphony] = true;
				newList.push(Immutable.fromJS(item))

				if (!manufacturers[item.make]){
					manufacturers[item.make] = [item.model]
				} else {
					manufacturers[item.make].push(item.model)
				}
				manufacturers.ALL.push(item.model)
			})
			
		 	return state.merge({
		 		items: new List(newList),
		 		filtered: new List(newList),
		 		models: new List(manufacturers.ALL),
		 		manufacturers: Map(manufacturers),
		 		years: Map(years),
		 		polyphonys: Map(polyphonys),
		 		currentImg: newList[0].get('img'),
		 		text: newList[0].get('text'),
		 		loaded,
		 	})
		/////////////////////////////////////////////////////////////
		default:
			return state;
	}
};

export default contentReducer;
