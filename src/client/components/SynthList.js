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
import List from 'react-virtualized/dist/commonjs/List';
import { Column, Table } from 'react-virtualized';
import * as actions from '../actions/creators';
import 'react-virtualized/styles.css';
import styled from 'styled-components'

const StyledDiv = styled.div`
  display: inline-block;
  width: 294px;
  padding: 11px;
`

class SynthList extends React.Component {

  makeList = (items) => (
	  <Table
	    width={294}
	    height={400}
	    headerHeight={20}
	    rowHeight={30}
	    rowCount={items.length}
	    rowGetter={({ index }) => items[index]}
	    rowStyle={{borderBottom:'1px solid black', fontFamily: 'sans-serif'}}
	    onRowMouseOver={this.props.changeImg}
	    //noRowsRenderer={() => (<div></div>)}
	    //style={{ margin: '0 0 0 0'}}
	  >
	    <Column
	      label='make'
	      dataKey='make'
	      width={150}  	      
	    />
	    <Column
	      width={150}
	      label='model'
	      dataKey='model'
	    />
	  
	  </Table>
  )

  render() {
  	const { loaded, filtered } = this.props;
  	return (
			loaded 
				? <StyledDiv> 
					 {this.makeList(filtered.toJS())} 
				</StyledDiv>
				: null
		)
  }
};



export default SynthList;
