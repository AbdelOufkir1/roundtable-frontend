import React, { Component } from 'react';
import {  HashRouter, Route, Switch } from 'react-router-dom';
import Login from './containers/login';
import Home from './containers/home';
import Header from './containers/header';
import Debate from './containers/debate';
import firebase from './firebase';
import AuthContext from './contexts/auth';
import Logout from './containers/logout';
import NewDebate from './containers/newDebate';

class App extends Component {

  state = {
    user : null
  }

  updateState = (newState) =>{
    this.setState({
      user: newState,
    })
  }

  loginGuest = (username) => {
    console.log('I MADE IT TO LOGIN GUEST', username)
    
    this.setState({
      user: username
    })

  }

  logoutGuest = () => {
    this.setState({
      user: null
    })
  }

  componentDidMount() {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      
      if (user) {
        this.setState({ 
          user: {
            uid: user.uid,
            email: user.email,
            }
         });
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
          {/* <Route component={}></Route>     */}
            <Switch>
              <Route path='/home' exact component={Home} />
              <Route path='/login' exact render={props => <Login {...props} loginGuest={this.loginGuest}/>} />
              <Route path='/debate/:id' exact component={Debate} />
              <Route path='/logout' exact render={props => <Logout {...props} logoutGuest={this.logoutGuest}/> } />
              <Route path='/newdebate' exact component={NewDebate} />
              {/* <Route component={ Error404 } /> */}
            </Switch>
          </AuthContext.Provider>
      </>
      </HashRouter>
    );
  }
} 

export default App;