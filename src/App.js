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
import User from './containers/user';
import Search from './containers/search';
import Footer from './containers/footer';
import Axios from 'axios';

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
        Axios.get('http://localhost:3001/user/', {
          params: {
            fbuid: user.uid
          }
        }).then(response => {
          
          this.setState({ 
            user: {
              uid: user.uid,
              email: user.email,
              id: response.data.id,
              name: response.data.name,
              }
           });
        })

        

         
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
              <Route path='/user/:id' exact component= {User} />
              <Route path="/search" exact component={Search} />
              {/* <Route component={ Error404 } /> */}
            </Switch>
            <Route path='/' component={ Footer } />
          </AuthContext.Provider>
      </>
      </HashRouter>
    );
  }
} 

export default App;