import React from 'react';
import firebase from '../firebase';

export default class Logout extends React.Component {

  componentDidMount() {
    this.props.logoutGuest()
    firebase.auth().signOut()
  }

  render() {
    return <h1>Logging out...</h1>
  }
}