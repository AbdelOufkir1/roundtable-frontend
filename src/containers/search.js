import React, { Component } from 'react';
import AuthContext from '../contexts/auth';
import Axios from 'axios';
import SearchCard from '../components/searchPage/searchCard';

class Search extends Component {

    static contextType = AuthContext;

    constructor(props) {

        super(props)

        this.state = {
            search:'',
            users: [],  
        }
    }

    componentDidMount() {
        Axios.get('http://localhost:3001/user/allusers')
            .then(response => { 
                // console.log('response in search: ', response)

                const newUsers = response.data.map((e, i) => {
                    if (e.numsupporters === null) e.numsupporters = 0;

                    const date = e.created_at.split('T')

                    const newUser = {
                        id: e.id,
                        name: e.name,
                        image: e.image,
                        email: e.email,
                        bio: e.bio,
                        supporters: e.numsupporters,
                        joined: date[0],
                    }
                    return newUser
                })

                this.setState({
                    users: newUsers
                })
            })
    }

    handleClickedCard = (e) => {

        console.log('you clicked the card', e)
        this.props.history.push(`/user/${e}`)
    }



    searchField = () => {

        return (<>
            <div class="ui fluid icon input">
                <input onChange={this.handleInput} type="text" placeholder="Search for users..." />
                <i onClick={this.handleSubmit} class="search icon"></i>
            </div>
        </>)
    }

    handleInput = (event) => {

        const newArr = this.state.users.filter(e =>  e.name.toLowerCase().includes(event.target.value))

        this.setState({
            users: newArr
        })
    }   

    addToSupport = (id) => {

        Axios.post(`http://localhost:3001/user/supporters/${this.context.id}/add`, {
            supporterId: id,
        })
        .then(response => {
            console.log(response)
        })

    }


    render() {

        console.log(this.state)
        return (
            <AuthContext.Consumer>
                {
                    (user) => {
                        if (user) {

                            return (
                                <>
                                    <div className="ui container" style={{ "padding-bottom": "50px" }}>
                                        < this.searchField />

                                    </div>
                                    <div className="ui container">
                                        <div class="ui centered link cards">

                                            {this.state.users.map((e, i) => {
                                                return <SearchCard
                                                    key={i}
                                                    id={e.id}
                                                    name={e.name}
                                                    image={e.image}
                                                    bio={e.bio}
                                                    joined={e.joined}
                                                    supporters={e.supporters}
                                                    handleClick={this.handleClickedCard}
                                                    addToSupport={this.addToSupport}
                                                />
                                            })
                                            }

                                        </div>
                                    </div>
                                </>
                            )

                        } else {
                            return <h1>You are not logged in </h1>
                        }
                    }
                }
            </AuthContext.Consumer>
        )
    }
}

export default Search;