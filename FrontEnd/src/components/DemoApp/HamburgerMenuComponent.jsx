import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import hexagonlogo from '../images/hexagonlogo_A1_Rectangle_13_pattern.png'
import menu_icon from '../images/Menu button.png'
import menu_icon_exit from '../images/Menu button exit.png'
import '../../HamburgerMenu.css'

class HamburgerMenuComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            isHamburgerMenuOpen: false, 
            icon: menu_icon
        }
    }

    openMenu = (isHamburgerMenuOpen) => {
        this.setState({isHamburgerMenuOpen : !isHamburgerMenuOpen})
        this.showMenuIcon(isHamburgerMenuOpen)
    }

    showMenuIcon = (isHamburgerMenuOpen) => {
        if(isHamburgerMenuOpen){
            this.setState({icon: menu_icon})
        }else{
            this.setState({icon: menu_icon_exit})
        }        
    }

    closeMenu = (isHamburgerMenuOpen) => {
        this.setState({isHamburgerMenuOpen : !isHamburgerMenuOpen})
        this.setState({icon: menu_icon})
    }

    logoutClicked = (isHamburgerMenuOpen) => {
        this.setState({isHamburgerMenuOpen : !isHamburgerMenuOpen})
        this.setState({icon: menu_icon})
        AuthenticationService.logout()        
    }

    viewMenu(){
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const {isHamburgerMenuOpen} = this.state;
        return (            
            <nav className="m-menu-bar">                    
                <ul className="m-navigation">
                    {isUserLoggedIn && <li><Link className="m-menu-icon" to="/welcome" onClick={()=> this.closeMenu(isHamburgerMenuOpen)}>HOME</Link></li>}
                    {isUserLoggedIn && <li><Link className="m-menu-icon" to="/profile" onClick={()=> this.closeMenu(isHamburgerMenuOpen)}>MY PROFILE</Link></li>}
                    {isUserLoggedIn && <li><Link className="m-menu-icon" to="/demos" onClick={()=> this.closeMenu(isHamburgerMenuOpen)}>DEMO'S</Link></li>}
                    {isUserLoggedIn && <li><Link className="m-menu-icon" to="/logout" onClick={()=> this.logoutClicked(isHamburgerMenuOpen)}>LOG OUT</Link></li>}
                </ul>
            </nav>        
        )    
    }

    render(){          
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const {isHamburgerMenuOpen} = this.state;
        let mobileMenu;
        if(this.state.isHamburgerMenuOpen){
            mobileMenu = this.viewMenu()
        }else{
            mobileMenu = null
        }      
        return (
            <div className="m-menu">
                {isUserLoggedIn && <button style={{borderWidth: "0px"}} onClick={()=> this.openMenu(isHamburgerMenuOpen)}>
                    <img className="m-menu-logo" alt="" src={this.state.icon}/></button>}             
                <img className="m-hexagonlogo" alt="" src={hexagonlogo}/>
                {mobileMenu}
            </div>
        )      
    }
}

export default withRouter(HamburgerMenuComponent)