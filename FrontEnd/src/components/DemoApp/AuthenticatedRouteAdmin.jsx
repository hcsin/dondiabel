import React, {Component} from 'react'
import {Route,Redirect} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import {USERROLE} from "./WelcomeComponent";

//check if user is logged in, only then he can visit certain pages/urls
class AuthenticatedRouteAdmin extends Component {
    isUserAdmin(){
        let user = sessionStorage.getItem(USERROLE)
        if(user==="ROLE_ADMIN") return true
        return false
    }

    render(){
        if(this.isUserAdmin()){
            return <Route {...this.props}/>
        }
        else{
            return <Redirect to="/welcome"/>
        }
    }

}
export default AuthenticatedRouteAdmin