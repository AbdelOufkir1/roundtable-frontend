import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import AuthContext from '../contexts/auth';

class Header extends Component {

    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
            
        const loggedInForm =  <> <div className="header">
                    <Link to="/home" className="logo">Round Table </Link>
                    <div className="header-right">
                        
                        <Link to="/home"> Home </Link>
                        <Link to="/logout"> Logout </Link>
                        <Link to=""> About </Link>
                    </div>
                </div> 
                </>;
        
        const loggedOutForm = <> <div className="header">
                        <Link to="/home" className="logo">Round Table </Link>
                        <div className="header-right">
                            
                            <Link to="/home"> Home </Link>
                            <Link to="/login"> Login </Link>
                            <Link to=""> About </Link>
                        </div>
                    </div>
                    </>;


        return ( 
        
        <AuthContext.Consumer>
        
            {
            (user) => {
                if (user) {
                return loggedInForm
                } else {
                return loggedOutForm
                }
            }
            }
        
        </AuthContext.Consumer>
        )        
    }

}

export default Header;