import React, {Component} from 'react'
import '../../App.css'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LoginComponent from './LoginComponent.jsx'
import RegisterComponent from './RegisterComponent.jsx'
import HeaderComponent from './HeaderComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import ProfileComponent from './ProfileComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import AddDemoComponent from './AddDemoComponent.jsx'
import UpdateDemoComponent from './UpdateDemoComponent.jsx'
import HamburgerMenuComponent from './HamburgerMenuComponent.jsx'
import MembersComponenten from "./MembersComponenten";
import AddUserComponent from "./AddUserComponent";
import DemoListComponentAdmin from "./DemoListComponentAdmin";
import DemoListComponentUser from "./DemoListComponentUser";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import AuthenticatedRouteAdmin from './AuthenticatedRouteAdmin'
//terminal: npm add react-router-dom

class DemoApp extends Component {
    render(){
        return (
            <div className="DemoApp">   
                <Router>
                    <HamburgerMenuComponent/>
                    <HeaderComponent/>      
                    <main>
{/* Make sure only one route is used at a time */}
                        <Switch >          
{/* Route defines wich page has wich url, AuthenticatedRoute can only be taken by authenticated users */}                                  
                            <Route path="/" exact component={LoginComponent}/>
                            <Route path="/login" component={LoginComponent}/>
                            <Route path="/register" component={RegisterComponent}/>
                            <AuthenticatedRoute path="/welcome" component={WelcomeComponent}/>
                            <AuthenticatedRoute path="/profile" component={ProfileComponent}/>
                            <AuthenticatedRoute path="/demos/add" component={AddDemoComponent}/>
                            <AuthenticatedRoute path="/demos/:id" component={UpdateDemoComponent}/>
                            <AuthenticatedRoute path="/demosuser" component={DemoListComponentUser}/>
                            <AuthenticatedRoute path="/logout" component={LogoutComponent}/>
                            <AuthenticatedRouteAdmin path="/demosadmin" component={DemoListComponentAdmin}/>
                            <AuthenticatedRouteAdmin path="/members" component={MembersComponenten}/>
                            <AuthenticatedRouteAdmin path="/adduser" component={AddUserComponent}/>
                            <Route path="" component={ErrorComponent}/>
                        </Switch>
                    </main>
                    <FooterComponent/>
                </Router>               
            </div>
        )
    }
}

export default DemoApp