import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import AuthContext from '../contexts/auth';


class Header extends Component {

    constructor(props) {
        super(props)
    }

    static contextType = AuthContext;


    LoggedInForm = () => {

        // console.log('in logged in form: ', this.context)
        return (

            <> <div className="myHeader">
                {/* <Link to="/home" className="logo"> <h1> Round Table </h1> welcome back {this.context.name} </Link> */}
                <div className="ui vertical labeled icon menu">
                    <a className="item">
                        <h1> Round Table </h1>
                        {this.context.name}
                    </a>

                </div>



                <div className="myHeader-right ui labeled icon menu" >
                    <Link to="/home" className="item">
                        <i className="home icon"></i>
                        Home
                    </Link>
                    <Link to={`/user/${this.context.id}`} className="item">
                        <i className="address book icon"></i>
                        Profile
                    </Link>
                    <Link to="/search" className="item">
                        <i className="search icon"></i>
                        Search
                    </Link>

                    {/* <Link to={{pathname: "/newdebate", state: {user: this.context} }}className="item"> */}
                    <Link to="/newdebate" className="item">
                        <i className="comments icon"></i>
                        New Debate
                    </Link>
                    <Link to="/logout" className="item">
                        <i className="logout icon"></i>
                        Logout
                    </Link>

                </div>
            </div>
            </>
        )
    }


    loggedOutForm = () => {
        return (<>  <div className="myHeader">
        <div className="ui vertical labeled icon menu" style={{marginTop:"20px"}}>
            <a className="item">
                <h1> Round Table </h1>
            </a>

        </div>

            <div className="myHeader-right ui labeled icon menu" >
                <Link to="/home" className="item">
                    <i className="home icon"></i>
                    Home
        </Link>

                <Link to="/login" className="item">
                    <i className="logout icon"></i>
                    Login
        </Link>

            </div>
        </div>
        </>
        )
    }



    render() {
        return (

            <AuthContext.Consumer>

                {
                    (user) => {

                        if (user) {
                            return <this.LoggedInForm />

                        } else {
                            return <this.loggedOutForm />
                        }
                    }
                }

            </AuthContext.Consumer>
        )
    }

}



export default Header;