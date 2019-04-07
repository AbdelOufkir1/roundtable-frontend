import React, {Component} from 'react';
import './debateBody.css';
import DebateBox from './debateBox';
const _ = require('lodash');

class DebateBody extends Component {
    constructor(props) {
        super(props) 
            
        this.state = {
            status :  false, 
            currentPost: '',
            debaterOne : [
                {
                    text: '',
                    time: '',
                }
            ],
            debaterTwo : [
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
            <div class="submitButton ui blue labeled submit icon button " onClick={this.addtoPosts}>
                <i class="icon edit"></i> Add Reply
            </div>
            </>
        )
    }

    submitButtonTwo = () => {
        return (
            <>
            <div class="submitButton ui blue labeled submit icon button" onClick={this.addtoPostsTwo}>
                <i class="icon edit"></i> Add Reply
            </div>
            </>
        )
    }


    handleSubmit = (e) => {

        e.preventDefault();
        
        this.setState({
            currentPost: e.target.value,
        })  
    }

    addtoPosts = (e) => {

        console.log("Im in add to posts: ", this.state.currentPost)

        const arr = _.cloneDeep(this.state.debaterOne);
        const obj = {text: this.state.currentPost, time: Date.now()}
        arr.push(obj);    
        this.setState({
            currentPost: '',
            debaterOne: arr,           
        })

        console.log('POSTS after add: ', this.state.debaterOne)
    } 

    addtoPostsTwo = (e) => {
        const arr = _.cloneDeep(this.state.debaterTwo);
        const obj = {text: this.state.currentPost, time:Date.now()}
        arr.push(obj)
        console.log('arr in D2: ', arr)
        this.setState({
            currentPost: '',    
            debaterTwo: arr,
        })
        
        console.log('POSTS after add: ', this.state.debaterTwo)


    }

    render () {
        
        return (
            <>

            
        <div className="row debateBox">
                 <div className="eight wide column textBox">
                 <div class="ui middle aligned divided list">
                
                    {   !this.state.debaterOne ? <></>
                            :
                        this.state.debaterOne.map((e,i) => {
                        console.log("eeee: ", e.time)
                
                        return <DebateBox 
                        side='One'
                        key={i}
                        text={e.text}
                        time={e.time}
                        />
                    })}
                    </div>

                     <div className="ui form">
                         <div className="field" onChange={this.handleSubmit}>
                             <label>Text</label>
                             <textarea> </textarea>
                         {this.submitButtonOne()}
                         </div>
                     </div>                      
                 </div>
                 <div className="eight wide column textBox">
                 <div class="ui middle aligned divided list">
                
                {   !this.state.debaterTwo ? <></>
                        :
                    this.state.debaterTwo.map((e,i) => {
                    console.log("eeee: ", e.time)
            
                    return <DebateBox 
                    side='two'
                    key={i}
                    text={e.text}
                    time={e.time}
                    />
                })}
                </div>
                     <div className="ui form">
                     <div className="field" onChange={this.handleSubmit}>
                             <label>Text</label>
                             <textarea> 
                                 
                                {/* {this.state.currentPost}  */}
                                
                             </textarea>
                              
                             {this.submitButtonTwo()}
                         </div>
                     </div>                      
                 </div>  
             </div>

              
                
            </>
        )
        
    }
}

export default DebateBody;
