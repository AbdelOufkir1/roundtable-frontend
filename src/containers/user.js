import React, { Component } from 'react';
import Axios from 'axios';
import './user.css';
import EditPage from '../components/userPage/editPage';
import SupportingPage from '../components/userPage/supportingPage';
import AuthContext from '../contexts/auth';

class User extends Component {

    static contextType = AuthContext;

    constructor (props) {
        super(props) 
            this.state = {
                status: 'supporting',
                user : {
                    id: '5',
                    name: 'Abidol Fikor',
                    image: 'https://www.shareicon.net/data/256x256/2016/05/24/770014_man_512x512.png',
                    bio: 'I Believe, I exist',
                    supporters:'34',
                    debaters: '23',
                    following: [1,2,3],
                    firebaseUid:'223122312',
                    joined: '12 APril 2019',
                    },
                debates: [
                    {
                        subject: 'current events',
                        category: 5,
                        title: 'waiting in JFK sucks! prove me wrong',
                        description: 'I have been waiting in jfk for two hours, and I can not afford it! please help!',
                        first_debater: {
                            name: 'Abdul',
                            image: "https://www.shareicon.net/data/128x128/2015/10/05/651222_man_512x512.png",
                        },
                        second_debater: {
                            name: 'Oufkir',
                            image: 'https://www.shareicon.net/data/128x128/2015/10/05/651222_man_512x512.png',
                        },
    
                    }
                ]

            }
    }

    componentDidMount() {

        const path = (this.props.location.pathname).split('/')
        const userId = parseInt(path[path.length - 1])

        Axios.get(`http://localhost:3001/user/${userId}`)
            .then(response => {
                console.log('res from DB', response)
                const newUser = {
                    id : response.data.id,
                    name: response.data.name,
                    image: response.data.image,
                    bio: response.data.bio,
                    supporters: response.data.numsupporters,
                    debaters: response.data.numdebaters,
                    following: response.data.following,
                    firebaseUid:response.data.firebase_uid,
                    joined: response.data.created_at,
                }
                this.setState({
                    user: newUser,
                })
            })
            
        

    }

    showProfile = () => {

        this.setState({
            status: 'profile',
        })
    }

    showSupporting = () => {

        this.setState({
            status: "supporting",
        })
    }


    profileHeader = () => {
        return (
            <>
                <div className="headerWrapper">
                <div class="ui grid">
                    <div class="four wide column">
                        <img src={this.state.user.image} alt=""     />
                    </div>
                    <div class="six wide column">
                        <p> <h1> {this.state.user.name} </h1></p>
                        <p> <h3> {this.state.user.bio} </h3></p>
                    </div>
                    <div class="six wide column">
                        

                        <table class="ui definition large very padded fixed table">
                       
                        <tbody>
                            <tr>
                            <td class="active"> <h3> Supporters </h3> </td>
                            <td><h3>  {this.state.user.supporters} </h3></td>
                            </tr>
                            <tr>
                            <td class="active"> <h3> Debaters </h3> </td>
                            <td> <h3> {this.state.user.debaters} </h3></td>
                            </tr>
                            <tr>
                            <td className="active"> <h3> Joined </h3></td>
                            <td> <h5> {this.state.user.joined} </h5> </td>
                            </tr>
                        </tbody></table>
                    </div>

                 </div>
                 <div class="ui  bottom attached buttons">
                    <div class="ui button" onClick={this.showProfile} >Edit Profile</div>
                    <div class="ui button"  >following</div>
                    <div class="ui button" onClick={this.showSupporting} >Supporting</div>
                    <div class="ui button">Threads</div>
                </div>

                 </div>
            </>
        )
    }

    profileBody = () => {
        return (
            <>
                 {
                    this.state.status === 'supporting' ?  <SupportingPage />  : <h1>nothing</h1>
                            
                 }
            </>
        )

    }
    

    render() {
        
        return (
            <AuthContext.Consumer>

            {
                (user) => {

                    if (user) {
                        return (
                    <>    
                        <div className="myContainer Top ">

                            <this.profileHeader />
       
                            <this.profileBody />
                     
                        </div>
                    </> 
                        )
                        
                    } else {
                        return <h1> You are not logged in </h1>
                    }
                }
            }
        </AuthContext.Consumer>
        
        )

        
               
            
        
    }
}

export default User;