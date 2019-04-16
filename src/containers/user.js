import React, { Component } from 'react';
import Axios from 'axios';
import './user.css';
import EditPage from '../components/userPage/editPage';
import SupportingPage from '../components/userPage/supportingPage';
import FollowingPage from '../components/userPage/followingPage';
import ThreadsPage from '../components/userPage/threadsPage';
import AuthContext from '../contexts/auth';

class User extends Component {

    static contextType = AuthContext;

    constructor (props) {
        super(props) 
            this.state = {
                status: 'supporting',
                user : {
                    id: '5',
                    email: 'fikor@email.com',
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
    
                    },
                ],
                supportingUser: [
                    {
                        id: '',
                        name: '',
                        image: '',
                        bio: '',
                        joined: '',
                        supporters:'',
                    },
                ],

            }
    }

    componentDidMount() {

        const path = (this.props.location.pathname).split('/')
        const userId = parseInt(path[path.length - 1])
        console.log('userID: ', path[path.length-1])
        const fbuid = path[path.length-1]

        Axios.get(`http://localhost:3001/user/`, {
            params: {
                fbuid:fbuid
            }})
        .then(response => {
              console.log('res from user', response)
                if (response.data.numsupporters === null) response.data.numsupporters = 0;
                if (response.data.numdebaters === null) response.data.numdebaters = 0
                const newJoined = response.data.created_at.split('T');

                const newUser = {
                    id : response.data.id,
                    name: response.data.name,
                    email: response.data.email,
                    image: response.data.image,
                    bio: response.data.bio,
                    supporters: response.data.numsupporters,
                    debaters: response.data.numdebaters,
                    following: response.data.following,
                    firebaseUid:response.data.firebase_uid,
                    joined: newJoined[0],
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

        // const path = (this.props.location.pathname).split('/')
        // const fbuid = path[path.length-1]

        console.log("ID: ", this.state.user.id)
        this.renderSupporting(this.state.user.id)
        
        
    }

    showFollowing = () => {

        this.setState({
            status: 'following',
        })
    }

    showThreads = () => {

        this.setState({
            status: "threads",
        })
    }

    renderSupporting = (uid) => {

        Axios.get(`http://localhost:3001/user/supporters/${uid}/list`)
            .then(response => {
                console.log("response", response)
                const newSupportingArray = response.data.map((e,i) => {

                    if(e.numsupporters === null) e.numsupporters = 0
                    const newJoin = e.created_at.split('T')

                    const newSupporting = {
                        id: e.id,
                        name: e.name,
                        image: e.image,
                        bio: e.bio,
                        joined: newJoin[0],
                        supporters: e.numsupporters,
                    }
                    return newSupporting
                })
                
                this.setState({
                    supportingUser:newSupportingArray
                })
            })
    }

    profileHeader = () => {
        return (
            <>
                <div className="headerWrapper">
                <div class="ui grid">
                    <div class="four wide column">
                        <img src={this.state.user.image} alt="" style={{width:"256px", height:"256px"}}    />
                    </div>
                    <div class="six wide column">
                        <p> <h1> {this.state.user.name} </h1></p>
                        <p> <h3> {this.state.user.bio} </h3></p>
                    </div>
                    <div class="six wide column">
                        

                        <table class="ui definition large very padded fixed table myTable">
                       
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
                    <div class="ui button"  onClick={this.showFollowing}>following</div>
                    <div class="ui button" onClick={this.showSupporting} >Supporting</div>
                    <div class="ui button" onClick={this.showThreads}>Threads</div>
                </div>

                 </div>
            </>
        )
    }

    profileBody = () => {
        return (
            <>
                 {
                     
                    this.state.status === 'supporting' ?  
                    <>
                            <div class="ui container supportingHeader">
                                <h2 class="ui center aligned icon header">
                                    <i class="circular users icon"></i>
                                    Supporting
                        </h2>
                            </div>
                            <div className="ui container">
                                        <div class="ui centered link cards">

                                        { 
                                            this.state.supportingUser.map((e,i) => {
                                                return < SupportingPage 
                                                    key={i}
                                                    id={e.id}
                                                    name={e.name}
                                                    image={e.image}
                                                    bio={e.bio}
                                                    joined={e.joined}
                                                    supporters={e.supporters}
                                                />
                                            })
                                        }
                                            
                                        </div>
                                    </div>
                                
                        
                    </>
                            : 
                    this.state.status === 'following' ? 
                            <FollowingPage />
                                : 
                    this.state.status === 'threads' ? 
                            <ThreadsPage /> 
                                    : 
                            <EditPage user={this.state.user} />                             
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
                        <div className="myContainers Top ">

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