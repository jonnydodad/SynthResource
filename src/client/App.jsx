/**
* ************************************
*
* @module  app
* @author  jonnydodad
* @date    08/07/18
* @description
*
* ************************************
*/
/**/
import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import SynthList from './components/SynthList';
import SynthFinder from './components/SynthFinder.js';
// import Header from './components/utils/Header';
// import Cart from './components/Cart';
// import ItemRouter from './components/ItemRouter';



const App = () => (
  <React.Fragment>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SynthList} />
        <Route exact path="/4" component={SynthFinder} />
        <Route component={() => (<div> 404 </div>)}
        />
      </Switch>
    </BrowserRouter>
  </React.Fragment>
);

export default hot(module)(App);
