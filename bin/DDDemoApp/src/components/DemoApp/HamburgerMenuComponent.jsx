import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import hexagonlogo from '../images/hexagonlogo_A1_Rectangle_13_pattern.png'
import menu_icon from '../images/Menu button.png'
import ViewHamburgerMenu from './ViewHamburgerMenu.jsx'
import '../../HamburgerMenu.css'

class HamburgerMenuComponent extends Component{

    constructor(props) {
        super(props)        
    }

    state = {isHamburgerMenuOpen: false}

    openMenu = (isHamburgerMenuOpen) => {
        this.setState({isHamburgerMenuOpen : !isHamburgerMenuOpen})
    }

    render(){          
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();
        const {isHamburgerMenuOpen} = this.state;
        let mobileMenu;
        if(this.state.isHamburgerMenuOpen){
            mobileMenu = <ViewHamburgerMenu/>
        }      
        return (
            <div className="m-menu">
                <div id="m-menu">
                    {isUserLoggedIn && <button onClick={()=> this.openMenu(isHamburgerMenuOpen)}><img className="m-menu-logo" alt="" src={menu_icon}/></button>}
                </div>
                <img className="m-hexagonlogo" alt="" src={hexagonlogo}/>
                {mobileMenu}
            </div>
        )      
    }
}

export default withRouter(HamburgerMenuComponent)