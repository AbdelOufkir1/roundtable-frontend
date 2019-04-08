import React, { Component } from 'react';
import {  HashRouter, Route, Switch } from 'react-router-dom';
import Login from './containers/login';
import Home from './containers/home';
import Header from './containers/header';
import Debate from './containers/debate';
import firebase from './firebase';
import AuthContext from './contexts/auth';
import logout from './containers/logout';

class App extends Component {

  state = {
    user : null
  }

  loginGuest = (guest) => {
    console.log('I MADE IT TO LOGIN GUEST')

    this.setState({
      user: guest
    })

  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      // console.log("user is app: ", user)
      if (user) {
        this.setState({ user });
      }
      else {
        this.setState({ user: null })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }


  render() {
    return (
      <HashRouter>
      <>
      <AuthContext.Provider value={this.state.user}>
          <Route path='/' component={ Header } />    
            <Switch>
              <Route path='/home' exact component={Home} />
              <Route path='/login' exact component={Login} />
              <Route path='/debate' exact component={Debate} />
              <Route path='/logout' exact component={logout} />
              {/* <Route component={ Error404 } /> */}
            </Switch>
          </AuthContext.Provider>
      </>
      </HashRouter>
    );
  }
} 

export default App;