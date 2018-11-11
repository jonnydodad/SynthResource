/**
* ************************************
*
* @module  header navbar
* @author  jonnydodad
* @date    08/07/18
* @description
*
* ************************************
*/
/* this could be more functional ... */

import React from 'react';
import { Link } from 'react-router-dom';
//import './Header.scss';

const Header = () => (
  <header className="Header" style={{borderBottom: '1px solid white', backgroundColor: 'aqua', textAlign: 'right', width: '100%', height: '50px'}}>
  	<div style={{textAlign: 'right', width: '758px', height: '0px', padding: '15px', margin: '0 auto', fontFamily: 'sans-serif', fontSize: '17px'}}>
	    <Link to="/">
	    
	    </Link>
	     <b>SYNTHESIZERS</b>
    </div>
  </header>
);

export default Header;
