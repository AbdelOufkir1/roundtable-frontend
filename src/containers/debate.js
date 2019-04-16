import React, { Component } from 'react';
import './debate.css';
import DebateHeader from '../components/debatePage/debateHeader';
import DebateBody from '../components/debatePage/debateBody';
import Discussions from '../components/debatePage/discussions';
import Axios from 'axios';
import AuthContext from '../contexts/auth';

class Debate extends Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props)

        this.state = {
            status: "InDebate",
            debate: {
                id: '',
                subject: 'Global Warming',
                title: 'Global warming is not a hoax. challenge me',
                description: 'this is a call for all global warming deniers to come challenge my proofs and pieces of evidence about global warming',
                rules: '3000 characters per response, 12 hours window for response',
                numfollowers: 10,
                debaters: {
                    first_debater: {
                        name: 'scaramucci',
                        image: 'https://www.shareicon.net/data/128x128/2017/07/13/888372_man_512x512.png',
                        num_supporters: '234',
                        num_debaters: '12',
                        firebase_uid: '232324hb3h4bdsds',
                    },
                    second_debater: {
                        name: 'Alex',
                        image: 'https://www.shareicon.net/data/128x128/2017/07/13/888372_man_512x512.png',
                        num_supporters: '232',
                        num_debaters: '11',
                        firebase_uid: '23dsadas343454sds',
                    }
                },
            }
        }

    }


    componentDidMount() {

        const path = (this.props.location.pathname).split('/')
        const pathNum = parseInt(path[path.length - 1])
        
        // console.log(pathNum)

        Axios.get(`http://localhost:3001/debate/${pathNum}`)
            .then(res => {
                console.log('response in debate: ', res)

                const newDebate = {
                    id: pathNum,
                    subject: res.data.subject,
                    title: res.data.title,
                    description: res.data.description,
                    rules: res.data.rules,
                    numfollowers: res.data.numfollowers,
                    debaters: {
                        first_debater: {
                            id: res.data.debaterone_id,
                            name: res.data.debaterone_name,
                            image: res.data.debaterone_image,
                            num_supporters: res.data.debaterone_supporters,
                            num_debaters: res.data.debaterone_debaters,
                            firebase_uid : res.data.debaterone_firebaseuid,
                        },
                        second_debater: {
                            id: res.data.debatertwo_id,
                            name: res.data.debatertwo_name,
                            image: res.data.debatertwo_image,
                            num_supporters: res.data.debatertwo_supporters,
                            num_debaters: res.data.debatertwo_debaters,
                            firebase_uid: res.data.debatertwo_firebaseuid,
                        }
                    }
                }

                this.setState({
                    debate: newDebate,
                })


            }).catch(err => {
                console.log('error in debatedid mount', err)
            })

    }


    handleClicked = (e) => {
        this.setState({
            status: e.target.getAttribute('name')
        })
    }

    addFollow = async () => {
        
        const did = parseInt(this.state.debate.id);

        try {
            const response = await Axios.get('http://localhost:3001/user/', {params: {fbuid: this.context.uid}});
            const uid = response.data.id;
            const res = await Axios.post('http://localhost:3001/debate/addfollower/',{ did:did, uid:uid });
            const follow = await Axios.get('http://localhost:3001/debate/getfollow');

           const followers = parseInt(follow.data[0].count);
            
            const newDebate = {...this.state.debate}
            newDebate.numfollowers = followers;

            this.setState({
                debate: newDebate
            })


        }
        catch(err) {
            console.log('err in addfollow: ', err)
        }

    }

    render() {

        console.log('render of debate: ', this.state)

        return (


            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user) {
                            return <>

                                <div className="ui container">
                                    <DebateHeader infos={this.state.debate} addFollow={this.addFollow} />
                                    <div className="ui two top attached buttons">
                                        <div className="ui teal button" name="InDebate" onClick={this.handleClicked} >Debate</div>
                                        <div className="ui blue button" name="InDiscussions" onClick={this.handleClicked} >Discussion</div>
                                    </div>
                                </div>


                                <div className="ui container debateWrapper">
                                    {this.state.status === 'InDebate' ?

                                        <div className="ui internally celled grid">
                                            <div className="row">
                                                <div className="eight wide column">
                                                    <p> Debater One </p>
                                                </div>
                                                <div className="eight wide column">
                                                    <p> Debater Two </p>
                                                </div>
                                            </div>

                                            <DebateBody data={this.state.debate} />

                                        </div>

                                        :

                                        <Discussions />
                                    }
                                </div>
                            </>
                        } else {
                            return <h2> You are not logged in </h2>
                        }
                    }
                }
            </AuthContext.Consumer>






        )
    }
}

export default Debate;
