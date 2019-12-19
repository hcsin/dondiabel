import React, {Component} from 'react'
import {Route,Redirect} from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

//check if user is logged in, only then he can visit certain pages/urls
class AuthenticatedRoute extends Component {
    render(){
        if(AuthenticationService.isUserLoggedIn()){
            return <Route {...this.props}/>
        }
        else{
            return <Redirect to="/login"/>
        }
    }

}
export default AuthenticatedRoute