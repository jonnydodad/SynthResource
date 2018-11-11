/**
* ************************************
*
* @module  page
* @author  jonnydodad
* @date    08/07/18
* @description general purpose page for displaying cards.
*
* ************************************
*/
/**/

import React from 'react';
import { connect } from 'react-redux';
import Immutable from 'immutable';
import PropTypes from 'prop-types';
// import Loading from './utils/Loading';
// import ErrorDisplay from './utils/ErrorDisplay';
//import Header from './utils/Header';
//import GetCards from './utils/GetCards';
//import Messages from './utils/Messages';
//import List from 'react-virtualized/dist/commonjs/List';
import { Column, Table } from 'react-virtualized';
import * as actions from '../actions/creators';
import 'react-virtualized/styles.css';
import styled from 'styled-components';
import SynthList from './SynthList';

const Div = styled.div`
  padding-top: 7px;
`
const Label = styled.label`
  width: 50px;
  display: inline-block;
`
const Select = styled.select`
  width: 125px;
  margin-top: 7px;
  background-color: aqua;
  outline: none;
  border: 1px solid white;
`
const FiltersContentBox = styled.div`
  width: 180px;
  height: '400px';
  float: left;
  font-family: sans-serif; 
  font-size: 13px;
  padding: 0 20px 20px 20px ;
  background-color: aqua;
`
const SynthFilters = ({ 
	filters,
	
	manufacturers,
	models,
	years,
	polyphonys,
	handleRadioChange,
	handleSelectChange
}) => (
<FiltersContentBox>
  <div style={{textAlign: 'center', fontSize: '16px', margin: '18px 0 8px 0'}}><b>FILTERS</b></div>

	<Label>make</Label>
  <Select onChange={handleSelectChange} value={filters.get('make')} id='make'>
  {
  	manufacturers.map((val, key) => <option value={key} key={key}>{key}</option>).toArray()
  }
  </Select>

  <Label>model</Label>
  <Select onChange={handleSelectChange} value={filters.get('model')} id='model'>
  {
  	models.map((mod) => <option value={mod} key={mod}>{mod}</option>).toArray()
  }
  </Select>

  <Label>year</Label>
  <Select onChange={handleSelectChange} value={filters.get('year')} id='year'>
  {
  	years.map((val, yr) => <option value={yr} key={yr}>{yr}</option>).toArray()
  }
  </Select>

  <Label>poly</Label>
  <Select onChange={handleSelectChange} value={filters.get('polyphony')} id='polyphony'>
  {
  	polyphonys.map((val, num) => <option value={num} key={num}>{num}</option>).toArray()
  }
  </Select>

  <div style={{textAlign: 'right', paddingTop: '17px', fontSize: '11px'}}>_synthesis_type</div>

	<form>
  {
  	filters.filter(f => typeof f === 'boolean').map((val, key) => (
			<Div key={key}>
		    <label>
		      <input 
		      	style={{appearance: 'none'}}
		      	type="radio" 
		      	value={key} 
		        checked={val} 
		        readOnly
		        onClick={handleRadioChange} />
		      {key} 
		    </label>
		  </Div>
		)).toArray().sort((a,b) => a.key < b.key ? -1 : 1 )
  }
  </form>
</FiltersContentBox>
)


export default SynthFilters;

