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
import Header from './utils/Header';
//import GetCards from './utils/GetCards';
//import Messages from './utils/Messages';
import List from 'react-virtualized/dist/commonjs/List';
import { Column, Table } from 'react-virtualized';
import * as actions from '../actions/creators';
import 'react-virtualized/styles.css';
import styled from 'styled-components';

import SynthList from './SynthList';
import SynthFilters from './SynthFilters';

const StyledDiv = styled.div`
  margin: 0 auto;
  width: 758px;
  height: 900px;
`
const Resources = styled.div`
  width: 200px;
  height: 500px;
  padding: 10px;
  float: right;
  background-color: aqua;
  font-family: sans-serif;
  font-size: 12px;
  
`

class SynthFinder extends React.Component {

  componentDidMount(){
  	const { loaded, fetchAllItems } = this.props;
  	if (!loaded) {
  		fetchAllItems();
  	} 
  }

  render() {
  	return (	
	  	<div>
	  	  <Header/>	
				<StyledDiv>

					<div style={{height: '180px', width: '508px', display:'inline-block',overflow: 'hidden', padding: '15px'}}>
					  
					 	<img src={this.props.currentImg} style={{height: '180px', margin: 'auto', display: 'block'}} />
					 	
					</div>

			  	<SynthFilters { ...this.props } />

					<SynthList { ...this.props } />

					<Resources>
						<div style={{width: '170px', margin: '0 auto'}}>
							<p><i>
							{this.props.text}
							</i></p>
						</div>
					</Resources>

				</StyledDiv>
			</div>
		)
  }
};

const mapStateToProps = state => ({
  currentImg: state.contentReducer.currentImg,
  text: state.contentReducer.text,
  filtered: state.contentReducer.filtered,
  manufacturers: state.contentReducer.manufacturers,
  models: state.contentReducer.models,
  years: state.contentReducer.years,
  polyphonys: state.contentReducer.polyphonys,
  error: state.contentReducer.error,
  loaded: state.contentReducer.loaded,
  filters: state.contentReducer.filters,

});
const mapDispatchToProps = dispatch => ({
  fetchAllItems: () => dispatch(actions.fetchAllItems()),
  changeImg: (e) => dispatch(actions.changeImg(e)),
  handleRadioChange: (e) => dispatch(actions.handleRadioChange(e)),
  handleSelectChange: (e) => dispatch(actions.handleSelectChange(e)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SynthFinder);


