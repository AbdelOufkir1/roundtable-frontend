import React, { Component } from 'react';
import './debate.css';
import DebateHeader from '../components/debatePage/debateHeader';
import DebateBody from '../components/debatePage/debateBody';

class Debate extends Component {
    constructor(props) {
    super(props)
    
        this.state = {
            debate : {
                subject : 'Global Warming',
                title : 'Global warming is not a hoax. challenge me',
                description : 'this is a call for all global warming deniers to come challenge my proofs and pieces of evidence about global warming',
                rules : '3000 characters per response, 12 hours window for response',
                debaters : {
                    first_debater : {
                        name : 'scaramucci',
                        image : 'https://www.shareicon.net/data/128x128/2017/07/13/888372_man_512x512.png',
                        num_supporters : '234',
                        num_debaters : '12',
                    },
                    second_debater : {
                        name : 'Alex',
                        image : 'https://www.shareicon.net/data/128x128/2017/07/13/888372_man_512x512.png',
                        num_supporters : '232',
                        num_debaters : '11',
                    }
                },
            }
        }
    
    }

    render() {
        return (
            <>

            <div class="ui container">
                <DebateHeader infos={this.state.debate} />
            </div>

            <div className="ui container debateWrapper">
                    <div className="ui internally celled grid">
                        <div class="row">
                            <div class="eight wide column">
                                <p> Debater One </p>
                            </div>
                            <div class="eight wide column">
                                <p> Debater Two </p>
                            </div>
                        </div>

                    <DebateBody />

                    </div>
                </div>
             
            </>
        )
    }
}

export default Debate;