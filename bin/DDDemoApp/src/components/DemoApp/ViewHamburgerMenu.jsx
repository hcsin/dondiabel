import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'
import {Link, withRouter} from 'react-router-dom'
import '../../HamburgerMenu.css'

class ViewHamburgerMenu extends Component{
    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return (            
            <nav className="m-menu-bar">                    
                <ul className="m-navigation">
                    {isUserLoggedIn && <li><Link className="m-menu-icon" to="/welcome/name">HOME</Link></li>}
                    {isUserLoggedIn && <li><Link className="m-menu-icon" to="/todos">MY PROFILE</Link></li>}
                    {isUserLoggedIn && <li><Link className="m-menu-icon"  to="/todos">DEMO'S</Link></li>}
                    {isUserLoggedIn && <li><Link className="m-menu-icon" to="/logout" onClick={AuthenticationService.logout}>LOG OUT</Link></li>}
                </ul>
            </nav>        
        )      
    }
}

export default withRouter(ViewHamburgerMenu)