import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'
import {Link, withRouter} from 'react-router-dom'
import hexagonlogo from '../images/hexagonlogo_A1_Rectangle_13_pattern.png'
import '../../Header.css'

class HeaderComponent extends Component{
    render(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        return (
            <header className="desktop-header">
                <nav className="menu-bar">                    
                    <ul className="navigation left">
                        {isUserLoggedIn && <li><Link className="menu-icon" to="/welcome/name">HOME</Link></li>}
                        {isUserLoggedIn && <li><Link className="menu-icon" to="/todos">MY PROFILE</Link></li>}
                    </ul>    
                        <Link to="/welcome/name"><img className="hexagonlogo" alt="" src={hexagonlogo}/></Link>
                    <ul className="navigation right">
                        {/* {!isUserLoggedIn && <li><Link className="nav-link menu-icon" to="/login">LOGIN</Link></li>} */}
                        {isUserLoggedIn && <li><Link className="menu-icon"  to="/todos">DEMO'S</Link></li>}
                        {isUserLoggedIn && <li><Link className="menu-icon" to="/logout" onClick={AuthenticationService.logout}>LOG OUT</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(HeaderComponent)      //ensure header menus are updated whenever the router is called