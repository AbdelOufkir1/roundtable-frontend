import React, { Component } from 'react';
// import AxiosCalls from '../axios';
import axios from 'axios';
import DebateList from '../components/debateList';
import './home.css';
import DiscussionsTable from '../components/discussionsTable';
import Suggestions from '../components/usersSuggestions';
import AuthContext from '../contexts/auth';
const _ = require('lodash');


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user: {
                userName: '',
                email: '',
                bio: '',
                firebaseUid: '',
                supporters: '',
                debaters: '',
            },
            discussions: [
                {
                    author: {
                        name: 'Abdul',
                        image: 'myImage.png',
                    },
                    debate: 'Life is such a rollercoster',
                    body: "I can't believe what's going on with me right now",
                    timeStamp: '03:39 pm April 20, 2019',
                },
                {
                    author: {
                        name: 'Oufkir',
                        image: 'myImage.png'
                    },
                    debate: 'Glolbal Warming is not backed by any science',
                    body: 'I have checked multiple sources and nothing says that what we call global warming is true',
                    timeStamp: '02:23 pm April 20, 2019',
                },
            ],
            signupStatus: true,
            debatesList: [
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
                {
                    subject: 'politics',
                    category: 2,
                    title: 'waiting in JFK sucks! prove me wrong',
                    description: 'I have been waiting in jfk for two hours, and I can not afford it! please help!',
                    first_debater: {
                        name: 'Aziza',
                        image: 'https://www.shareicon.net/data/128x128/2015/10/05/651222_man_512x512.png',
                    },
                    second_debater: {
                        name: 'Elyas',
                        image: 'https://www.shareicon.net/data/128x128/2015/10/05/651222_man_512x512.png',
                    },

                },
                {
                    subject: 'current events',
                    title: 'waiting in JFK sucks! prove me wrong',
                    description: 'I have been waiting in jfk for two hours, and I can not afford it! please help!',
                    first_debater: {
                        name: 'Soukaina',
                        image: 'https://www.shareicon.net/data/128x128/2015/10/05/651222_man_512x512.png',
                    },
                    second_debater: {
                        name: 'Yasin',
                        image: 'https://www.shareicon.net/data/128x128/2015/10/05/651222_man_512x512.png',
                    },

                },
            ]

        }
    }

    componentDidMount() {

        console.log('in Homes component did mount ', this.props.location.myState)

        if(!this.props.location.myState) {
            this.setState({
                userName: '',
            })
        }
        else {
            this.setState({
                user: {
                    userName: this.props.location.myState.username,
                    email: this.props.location.myState.email,
                    firebaseUid: this.props.location.myState.firebaseUid,   
                }
            })
        }

        axios.get('http://localhost:3001/debate/all')
            .then(response => {
                console.log('debate loaded in home: ',response.data) 
                // let debateListCpy = _.cloneDeep(this.state.debatesList);
                const newDebate = response.data.map((e, i) => {

                    const debateObj = {
                        id : e.id,
                        subject: e.category,
                        title: e.title,
                        category: e.category,
                        description: e.description,
                        first_debater: {
                            name: e.user1_name,
                            image: e.user1_image,
                        },
                        second_debater: {
                            name: e.user2_name,
                            image: e.user2_image,
                        },
                    }

                    return debateObj;
                })
                // debateListCpy = debateListCpy.concat(newDebate)
                // console.log('NEW DEBATE ARRAY: ', newDebate)
                this.setState({
                    debatesList: newDebate,
                })
            })
            .then(() => {
                axios.get('http://localhost:3001/debate/discussions/every')
                    .then((response) => {
                        // console.log('data from posts: ', response)

                        const newDiscussions = response.data.map((e, i) => {

                            const discussionObj = {
                                author: {
                                    name: e.user_name,
                                    image: e.user_image,
                                },
                                debate: e.title,
                                body: e.body,
                                timeStamp: e.created_at,
                            }
                            return discussionObj
                        })
                        this.setState({
                            discussions: newDiscussions,
                        })
                    })
            })
    }

    handleBox = (e) => {
        this.props.history.push(`/debate/${e}`)
    }

    render() {
        console.log("state in home: ", this.state)

        return (

            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user) {
                            return (
                                <>
                                    <div className="ui centered grid">
                                        <div class="eight wide column">
                                            <h3 class="ui top attached header">
                                                Active Debates                                          
                                            
                                                {this.state.debatesList.map((e, i) => {

                                                    return <DebateList
                                                        handleBox={this.handleBox}
                                                        key={i}
                                                        id={e.id}
                                                        category={e.category}
                                                        title={e.title}
                                                        description={e.description}
                                                        first_debater={e.first_debater}
                                                        second_debater={e.second_debater}
                                                    />
                                                })}
                                            
                                            </h3>
                                        </div>
                                        {/* <div class="two wide column">
                                            < Suggestions />
                                        </div> */}
                                    </div>
                                    <div className="tableWrapper ui container">
                                        <table class="ui celled table">
                                            <thead>
                                                <tr>
                                                    <th className="four wide"> User </th>
                                                    <th className="three wide"> Debate </th>
                                                    <th className="six wide"> Comment </th>
                                                    <th className="three wide"> Posted </th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {this.state.discussions.map((e, i) => {

                                                    return <DiscussionsTable
                                                        key={i}
                                                        authorName={e.author.name}
                                                        authorImage={e.author.image}
                                                        debate={e.debate}
                                                        body={e.body}
                                                        timeStamp={e.timeStamp}
                                                    />
                                                })
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                </>
                            )
                        } else {
                            return <h2>You are not logged in.</h2>
                        }
                    }
                }
            </AuthContext.Consumer>



        )
    }
}

export default Home;