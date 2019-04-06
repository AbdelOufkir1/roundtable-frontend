import React, { Component } from 'react';
import {  HashRouter,Route } from 'react-router-dom';
import Login from './containers/login';
import Home from './containers/home';
import Header from './containers/header';
import Debate from './containers/debate';

class App extends Component {
  render() {
    return (
      <HashRouter>

      <>
      
      <Route path='/' component={Header} />
      <Route path='/home' exact component={Home} />
      <Route path='/login' exact component={Login} />
      <Route path='/debate' exact component={Debate} />

      </>
      </HashRouter>
    );
  }
} 

export default App;