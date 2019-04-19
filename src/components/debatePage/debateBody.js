import React, { Component } from 'react';
import AuthContext from '../../contexts/auth';
import './debateBody.css';
import DebateBox from './debateBox';
import Axios from 'axios';
const _ = require('lodash');


class DebateBody extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            debaterOneId: '',
            debaterOnefbuid: '',
            debaterTwoId: '',
            debaterTwofbuid: '',
            currentPostOne: '',
            currentPostTwo: '',
            debaterOne: [
                {
                    text: '',
                    time: '',
                }
            ],
            debaterTwo: [
                {
                    text: '',
                    time: '',
                }
            ],
        }
    }

    submitButtonOne = () => {
        return (
            <>
                <div class="submitButton ui fluid blue labeled submit icon button " onClick={this.addtoPostsOne}>
                    <i class="icon edit"></i> Add Reply
            </div>
            </>
        )
    }

    submitButtonTwo = () => {
        return (
            <>
                <div class="submitButton ui fluid blue labeled submit icon button" onClick={this.addtoPostsTwo}>
                    <i class="icon edit"></i> Add Reply
            </div>
            </>
        )
    }


    handleSubmitOne = (event) => {

        // e.preventDefault();    

        console.log('in handle sbmit: ', event.target.value)
        this.setState({
            currentPostOne: event.target.value,
        })
    }

    handleSubmitTwo = (e) => {

        e.preventDefault();
        this.setState({
            currentPostTwo: e.target.value,
        })
    }

    addtoPostsOne = (e) => {

        if (this.context.uid === this.state.debaterOnefbuid) {

        Axios.post('http://localhost:3001/debate/posts/new', {
            did: this.state.id,
            uid: this.state.debaterOneId,
            text: this.state.currentPostOne,
        }).then(timestamp => {

            Axios.get(`http://localhost:3001/debate/posts/${this.state.id}/${this.state.debaterOneId}/all`)
                .then(response => {
                    const newDebaterOne = response.data.map(e => {
                        const newCreatedAt = e.created_at.split('.');
                        const Obj = {
                            text: e.text,
                            time: newCreatedAt[0].split('T').join(' '),
                        }
                        console.log("OBJ :", Obj)
                        return Obj

                    })

                    this.setState({
                        debaterOne: newDebaterOne,
                    })
                })
        })
        }

        else {
            window.alert("You can't edit what you don't own")
        }

    }

    addtoPostsTwo = (e) => {

        if (this.context.uid === this.state.debaterTwofbuid) {

            Axios.post('http://localhost:3001/debate/posts/new', {
                did: this.state.id,
                uid: this.state.debaterTwoId,
                text: this.state.currentPostTwo,
            }).then(timestamp => {
    
                Axios.get(`http://localhost:3001/debate/posts/${this.state.id}/${this.state.debaterTwoId}/all`)
                    .then(response => {
                        console.log("data from db: ", response)
                        const newDebaterTwo = response.data.map(e => {
                            const newCreatedAt = e.created_at.split('.');
                            const Obj = {
                                text: e.text,
                                time: newCreatedAt[0].split('T').join(' '),
                            }
                            console.log("OBJ :", Obj)
                            return Obj
    
                        })
    
                        this.setState({
                            debaterTwo: newDebaterTwo,
                        })
                    })
            })
            }
    
            else {
                window.alert("You can't edit what you don't own")
            }

    }

    componentDidMount() {


        Axios.get(`http://localhost:3001/debate/posts/all/${this.props.data.id}`)
            .then(res => {
                console.log('data: ', res)
                const newDebaterOne = []
                const newDebaterTwo = []

                res.data.forEach((e, i) => {
                    if (e.user_id === this.props.data.debaters.first_debater.id) {
                        const newPostOne = { text: e.text, time: e.created_at }
                        newDebaterOne.push(newPostOne)
                    }


                    if (e.user_id === this.props.data.debaters.second_debater.id) {
                        const newPostTwo = { text: e.text, time: e.created_at }
                        newDebaterTwo.push(newPostTwo)
                    }
                })

                this.setState({
                    debaterOne: newDebaterOne,
                    debaterTwo: newDebaterTwo,
                })
            })

        this.setState({
            id: this.props.data.id,
            debaterOnefbuid: this.props.data.debaters.first_debater.firebase_uid,
            debaterTwoIdfbuid: this.props.data.debaters.second_debater.firebase_uid,
            debaterOneId: this.props.data.debaters.first_debater.id,
            debaterTwoId: this.props.data.debaters.second_debater.id,
        })
    }

    render() {

        // console.log('render of debate body: ', this.state)

        return (
            <>

                <AuthContext.Consumer>
                    {
                        (user) => {
                            if (user) {
                                return (
                                    <div className="row debateBox">
                                        <div className="eight wide column textBox">
                                            <div class="ui middle aligned divided list">

                                                {!this.state.debaterOne ? <></>
                                                    :
                                                    this.state.debaterOne.map((e, i) => {
                                                        console.log("eeee: ", e.text)

                                                        return <DebateBox
                                                            side='One'
                                                            key={i}
                                                            text={e.text}
                                                            time={e.time}
                                                        />
                                                    })}
                                            </div>

                                            <div className="ui form ">
                                                <div className="field" onChange={this.handleSubmitOne}>
                                                    <label>Text</label>
                                                    <textarea> </textarea>
                                                    {this.submitButtonOne()}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="eight wide column textBox">
                                            <div class="ui middle aligned divided list">

                                                {!this.state.debaterTwo ? <></>
                                                    :
                                                    this.state.debaterTwo.map((e, i) => {

                                                        return <DebateBox
                                                            side='two'
                                                            key={i}
                                                            text={e.text}
                                                            time={e.time}
                                                        />
                                                    })}
                                            </div>
                                            <div className="ui form">
                                                <div className="field" onChange={this.handleSubmitTwo}>
                                                    <label>Text</label>
                                                    <textarea>

                                                        {/* {this.state.currentPost}  */}

                                                    </textarea>

                                                    {this.submitButtonTwo()}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else {
                                return <h1> you are not logged in </h1>
                            }
                        }
                    }
                </AuthContext.Consumer>






            </>
        )

    }
}

export default DebateBody;
