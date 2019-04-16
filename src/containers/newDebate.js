import React, { Component } from 'react';
import Axios from 'axios';
import AuthContext from '../contexts/auth';
import {  Redirect } from 'react-router-dom';


class NewDebate extends Component {

    static contextType = AuthContext;

    state = {
        currentUser :{
            firebaseUid: '',
            email: '',
            },
        message: '',
        error: false,
        value: '',
        currentUser : '',
        title: '',
        description: '',
        rules: '',
        debaterOne: '',
        debaterTwo: '',
        debaters : [
            {
                name: "Aziza",
                id: 5,
            },
        ],
    }


    componentDidMount() {
       
        Axios.get('http://localhost:3001/user/allusers')
            .then(response => {
                console.log(response.data)
                const newDebaters = response.data.map(e => {
                    const debater = {
                        name: e.name,
                        id: e.id,
                    }
                    return debater
                })

                this.setState({
                    debaters: newDebaters
                })
            })   
    }

    handleDropdown = (e) => {
        
        this.setState({
            [e.target.name]: e.target.value,
        })
        console.log(this.state)
    }

    handleChange = e => {
        // console.log(this.state.title.length)

        const input = this.state;

        if (input.title.length < 40 && input.description.length < 80 && input.rules.length < 60 ){
            this.setState({
                error: false,
                [e.target.name] : e.target.value,
            })
        }
        else {
           this.setState({
            [e.target.name] : e.target.value,
            error : true,
           })
        }   
    }


    showError = () => {
        return  <div class="ui error message">
                <div class="header">Action Forbidden</div>
                   <p> Keep your input within the characters' limit</p>
                </div>
    
    }

    handleSubmit = (e) => {

        e.preventDefault();

            // console.log(this.context)

            if (!this.state.error) {
            Axios.get(`http://localhost:3001/user/`, {
                params : {
                    fbuid: this.context.uid,
                    }
                })
            .then(response => {
                this.setState({
                    debaterOne: response.data.id,
                    })     
                })
            .then(()=> {
                const { value, title, description, rules, debaterOne, debaterTwo} =  this.state;

                if(value && title && description && debaterOne && debaterTwo){
                    Axios.post('http://localhost:3001/debate/', {
                        first_debater: debaterOne,
                        second_debater: debaterTwo,
                        title: title,
                        description: description,
                        rules: rules,
                        category: value,
                    })
                    .then(response=> {
                        
                        this.props.history.push(`/debate/${response.data.id}`)
                    })
                    .then(() => {

                    })
                    
                    .catch(err => {
                        console.log(err)
                    })
                }
            })
        }
        else {
            console.log('fix your errors')
        }   

    }
    

    render () {
        // console.log("new debate render: ", this.context)
        
        // console.log(this.state.debaterOne)
        return (
            <AuthContext.Consumer>
              {
                (user) => {
                  if (user) {

                    return  <div className="ui container">
                    <h2 className="ui center aligned icon header">
                        <i className="circular settings icon"></i>
                              Create New Debater
                    </h2>

    
                    <div className="ui teal inverted segment ">
                        <div className="ui inverted big form">
    
                            <select name="value" value={this.state.value} onChange={this.handleDropdown} className="ui wide dropdown field">
                                <option value="">Category</option>
                                <option value="1">Politics & Economics</option>
                                <option value="2">Science & Technology</option>
                                <option value="3"> Environment & Medicine</option>
                                <option value="4">Religion & Philosophy</option>
                                <option value="5"> Sports </option>
                                <option value="6">Entertainment </option>
                                <option value="7">News & Current Events</option>
                                <option value="8"> Music & Films </option>
                                <option value="10"> Other </option>
                            </select>
    
                                <br></br>
                                <div className="wide field">
                                    <label> Title </label>
                                    <input placeholder="title" type="text" name="title" onChange={this.handleChange} />
                                    <p> {this.state.title.length} /40 characters Max</p>
                                </div>

                                <br></br>

                                <div className="wide field">
                                        <label> Description </label>
                                        <textarea rows="2" placeholder="Description" name="description" onChange={this.handleChange} ></textarea>
                                        <p> {this.state.description.length} /80 characters Max</p>

                                </div>

                                <br></br>

                                <div className="wide field">
                                    <label> Rules </label>
                                    <textarea rows="2" placeholder="Rules" name="rules" onChange={this.handleChange} ></textarea>
                                    <p> {this.state.rules.length} /60 characters Max</p>

                                </div>
                            
                        <br></br>
                            <select name="debaterTwo" value={this.state.debaterTwo}  onChange={this.handleDropdown}className="ui dropdown wide field">
                                <option  >Debaters</option>
                                { this.state.debaters.map((e,i) => {
                                    return <option key={i} value={e.id} id={e.name}> {e.name} </option>
                                })}
                            </select>
                            
                        <br></br>

                           </div>

                          { this.state.error ? this.showError() : "" }


                            
                            <div className="ui submit button" onClick={this.handleSubmit}>Submit</div>
                        </div>
                    
                </div>
                  } else {
                    return <h1> you are not logged in</h1>;
                  }
                }
              }
            </AuthContext.Consumer>
          )
          
    }
}

export default NewDebate;