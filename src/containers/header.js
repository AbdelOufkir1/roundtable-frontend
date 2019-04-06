import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './header.css';

class Header extends Component {

    constructor(props){
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <>
                <div className="header">
                    <a href="#default" className="logo">Round Table</a>
                    <div className="header-right">
                        
                        <Link to="/home"> Home </Link>
                        <Link to="/login"> Login </Link>
                        <Link to=""> About </Link>
                    </div>
                </div>
            </>
        )
    }

}

export default Header;