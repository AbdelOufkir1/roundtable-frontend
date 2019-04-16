import React, { Component } from 'react';
import * as firebase from 'firebase';
import Axios from 'axios';
// import app from '../../firebase';



class EditPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
        
                name: '',
                id: '',
                image: '',
                bio: '',
                email: '',

        }
    }

    handleChange = (e) => {
        console.log('in handle change', e.target)

        this.setState({
            [e.target.name] : e.target.value,
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault();

        console.log('in submit')

        
        try {
        
            const putCall = await Axios.put(`http://localhost:3001/user/${this.props.user.id}/`, {
                name: this.state.name || this.props.user.name,
                bio: this.state.bio || this.props.user.bio,
                email: this.props.user.email,
                image: this.state.image || this.props.user.image,
            })

            const getCall = await Axios.get(`http://localhost:3001/user/${this.props.user.id}`)

            console.log('getcall: ', getCall)
            const setit = await this.setState({
                name: getCall.data.name,
                id: getCall.data.id,
                image: getCall.data.image,
                email: getCall.data.email,
                bio: getCall.data.bio,
            })
        }
        catch(err) {
            console.log(err)
        }
    }



    handleFileInput = async (e) => {
        const firstFile = e.target.files[0];

        const root = firebase.storage().ref()
        const profile = root.child(this.props.user.name);
        const newImage = profile.child(firstFile.name);

        try {
            const snapshot = await newImage.put(firstFile);
            const url = await snapshot.ref.getDownloadURL();
            this.setState({
                image: url,
            })
        }
        catch (err) {
            console.log('err in upload: ', err);
        }

    }

    displayForm = () => {
        return (
            <form className="ui form">
                <div className="field">
                    <label>UserName</label>
                    <input type="text" name="name" placeholder="UserName" onChange={this.handleChange}/>
                </div>
                <div className="field">
                    <label> Biography </label>
                    <input type="text" name="bio" placeholder="Bio" onChange={this.handleChange} />
                </div>
                <div className="field">
                     <label> Profile Picture </label>
                     <input type="file" className="image" onChange={this.handleFileInput}/>
                     <label className="custom-file-label">Upload Image (for best Display, use 256 X 256)  </label>

                </div>

                <button className="ui button" type="submit" onClick={this.handleSubmit} >Submit</button>
            </form>
        )

    }


    displayCard = () => {
        return (
            <>
                <div class="ui card">
                    <div class="image">
                        <img src={this.state.image} />
                    </div>
                    <div class="content">
                        <a class="header"> {this.state.name}</a>
                        <div class="meta">
                            <span class="date">{this.state.joined}</span>
                        </div>
                        <div class="description">
                            {this.state.bio}
                        </div>
                    </div>
                    <div class="extra content">
                        <a>
                            <i class="user icon"></i>
                            {this.state.email}
                        </a>
                    </div>
                </div>

            </>
        )
    }

    render() {

        console.log('user in edit: ', this.state)

        return (
            <div class="ui segment">
                <div class="ui two column very relaxed grid">
                    <div class="column">
                        {this.displayForm()}
                    </div>
                    <div class="column" style={{ display: "flex" }}>
                        {this.displayCard()}
                    </div>
                </div>
                <div class="ui vertical divider">
                    Display
                </div>
            </div>
        )
    }
}
export default EditPage;
