import React, { Component } from 'react';
import './debate.css';
import DebateHeader from '../components/debatePage/debateHeader';
import DebateBody from '../components/debatePage/debateBody';
import Discussions from '../components/debatePage/discussions';

class Debate extends Component {
    constructor(props) {
    super(props)
    
        this.state = {
            status : "InDebate",
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

    handleClicked = (e) => {
        
        this.setState({
            status: e.target.getAttribute('name')
        })
    }       

    render() {
        return (
            <>

            <div class="ui container">
                <DebateHeader infos={this.state.debate} />
                <div className="ui two top attached buttons">
                    <div className="ui teal button" name="InDebate" onClick={this.handleClicked} >Debate</div>
                    <div className="ui blue button" name="InDiscussions" onClick={this.handleClicked} >Discussion</div>
                </div>
            </div>


            <div className="ui container debateWrapper">
                { this.state.status === 'InDebate' ?

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

                :
                
                <Discussions />
             }
            
            

                
                   
                </div>
             
            </>
        )
    }
}

export default Debate;