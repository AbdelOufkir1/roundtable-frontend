import React, { Component } from 'react';
import './login.css';
import firebase from '../firebase';
import {  Redirect } from 'react-router-dom';
import AuthContext from '../contexts/auth';
import axios from 'axios';


class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id : '',
            username: '',
            email: '',
            password: '',  
            signupStatus : false,
            error : null,
            firebaseUid : null,
        }
    }

    handleChange = (e) => {
        // console.log('target Name:', e.target.name)
        this.setState({ [e.target.name]: e.target.value });
      }
    

    handleSignUp = e => {
        
        let copyState = this.state.signupStatus;
        copyState = !copyState;
        
        this.setState({
            signupStatus: copyState,    
            username: '',
            email: '',
            password: '',
            error: null,
        })
    }

    handleSignUpSubmit = (e) => {
        e.preventDefault();
        this.setState({
            error:null,
        })
    
        const { email, password, username } = this.state;
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then((response) => {
                axios.post('http://localhost:3001/user/', {
                    name: username,
                    email: email,
                    firebase_uid : response.user.uid,
                    image: 'gs://roundtable-5b0dc.appspot.com/man.png',
                })
                    return response.user.uid
                .then(uid => {
                    
                        axios.get('http://localhost:3001/user/', {
                            params:{
                                fbuid: uid
                            }
                        })
                    .then(response => {
                        console.log('user info from DB in sign up: ', response )
                    }, err => {
                        console.log('err in signup: ', err)
                    })
                    
                    // console.log("response from DB: ", res)                    
                })
                .catch(err => {
                    // console.log('error in axios call: ', err)
                    this.setState({
                        error: err,
                    })
                })
                
             this.setState({
                  firebaseUid: response.user.uid,
              })

          })
          
          .catch(err => {
            const { message } = err;
            this.setState({ 
                error: message,
             });
          })
      }
    
    
    handleSignInSubmit = (e) => {
        // console.log('In SIgn In Submit')
        e.preventDefault();
        this.setState({
            error:null,
        })
    
        const { email, password } = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password) 
          .then((response) => {

            // console.log('response: ', response.user.providerData[0].email)
            if (response.user.uid){          

                    axios.get(`http://localhost:3001/user/`, {
                        params : {
                            fbuid: response.user.uid,
                            }
                        })
                    .then(res => {
                        // this.props.history.push(`/user/${res.data.id}`)
                        // console.log('res in Sign In: ', res)
                        this.setState({
                            id: res.data.id,
                            firebaseUid: response.user.uid
                            })
                            // console.log("State in login: ", this.state)
                        })

                
            }

            else {
                console.log('user ID DOES NOT EXIST')
            }
          })
          .catch(err => {
            const { message } = err;
            this.setState({ 
                error: message 
            });
          })
      }


    showEror = () => {
        return (
            <div className="ui negative message">
                <i className="close icon"></i>
                <div className="header">
                    Sign Up Failed
                </div>
                <p> { this.state.error }</p>
            </div>
        )
    }

    signupForm = () => {
        return (

            <div className="ui placeholder segment">
                <div className="ui two column very relaxed stackable grid">
                    <div className="middle aligned column">
                        <div className="ui big button" onClick={this.handleSignUp}>
                            <i className="sign-in icon"></i>
                            Sign In
                        </div>
                    </div>
                    <div className="column">
                        <div className="ui form">
                            <div className="field">
                                <label>UserName</label>
                                <div className="ui left icon input">
                                    <input type="text" placeholder="username" name="username" onChange={this.handleChange} />
                                    <i className="user icon"></i>
                                </div>
                            </div>
                            <div className="field">
                                <label>Email</label>
                                <div className="ui left icon input">
                                    <input type="text" placeholder="email" name="email" onChange={this.handleChange} />
                                    <i className="user icon"></i>
                                </div>
                            </div>
                            <div className="field">
                                <label>Password</label>
                                <div className="ui left icon input">
                                    <input type="password" name="password" onChange={this.handleChange} />
                                    <i className="lock icon"></i>
                                </div>
                            </div>
                            <button className="fluid ui red button" type="submit" onClick={this.handleSignUpSubmit} >Submit</button>
                        </div>
                        {
                            this.state.error !== null ? this.showEror() : <></>
                        }

                    </div>
                </div>
                <div className="ui vertical divider">
                    Or
                 </div>
            </div>
        )
    }

    signInForm = () => {
        return (
            <div className="ui placeholder segment">
                        <div className="ui two column very relaxed stackable grid">
                            <div className="column">
                                <div className="ui form">
                                    <div className="field">
                                        <label>Email</label>
                                        <div className="ui left icon input">
                                            <input type="text" placeholder="email" name="email" onChange={this.handleChange}/>
                                            <i className="user icon"></i>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <label>Password</label>
                                        <div className="ui left icon input">
                                            <input type="password" name="password" onChange={this.handleChange}/>
                                            <i className="lock icon"></i>
                                        </div>
                                    </div>
                                    <div className="ui blue submit button" onClick={this.handleSignInSubmit}>Login</div>
                                </div>
                                
                                { this.state.error !== null ? this.showEror() : <></> }

                            </div>
                            <div className="middle aligned column">
                                <div className="ui big button" onClick={this.handleSignUp}>
                                    <i className="signup icon"></i>
                                    Sign Up
                                </div>
                            </div>
                        </div>
                        <div className="ui vertical divider">
                            Or
                        </div>
                    </div>
        )
    }

    render() {
        // console.log('state: ', this.state)

        const displayForm = <div className='page-container'>
                 <div className="image-background"></div>
                 <div className="myContainer">
                     <div className="ui raised padded container segment">
                         {   !this.state.signupStatus ? this.signInForm() : this.signupForm()    }            

                        
                        <button class="huge ui button GuestButton" onClick={this.props.loginGuest}>
                            Login as Guest
                        </button>

                     </div>
                     

                 </div>
             </div>
    
    
        return (
            <>

            <AuthContext.Consumer>
                {
                (user) => {
                    if (user) {
                        return <Redirect to="home" />
                        // return <Redirect to={{  pathname: '/home', myState: this.state }} />
                    } else {
                        return displayForm                       
                    }
                }
                }
            </AuthContext.Consumer>

            </>
        )
    }
}

export default Login;
