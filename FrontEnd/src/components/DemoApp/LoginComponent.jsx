import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'
import Hexagon_logo_vector from '../images/Hexagon logo Don Diablo vector FillWhite.png'
import {Link} from 'react-router-dom'
import '../../App.css'

//control component the React component that renders a form 
//also controls what happens in that form on subsequent user input (this.state)
class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: "",
            password: "",
            wasLoginSuccesful: false,
            showErrorMessage: false
        }
        // if (AuthenticationService.isUserLoggedIn) {
        //     this.props.history.push("/Welcome");
        // }
    }

//handles change for all input fields 
    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]
                :event.target.value
            }
        )
    }
    refreshPage() {
        window.location.reload(false);
    }
    loginClicked = () => {
//instead of password we need a token, token comes from response.data
        AuthenticationService.executeJwtAuthenticationService(this.state.username,this.state.password)
        .then((response) => {                
            AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token);
            this.props.history.push("/welcome")
            this.refreshPage()
            }).catch(() => {
                this.setState({showErrorMessage:true})
                this.setState({wasLoginSuccesful:false})
            })
        }

    render(){
        return (
            <>                
                <img id="Hexagon_logo_vector" alt="" src={Hexagon_logo_vector}/>
{/* if condition is true, div will be executed */}
                {this.state.wasLoginSuccesful && <div>Login Succesful</div>}
                {this.state.showErrorMessage && <div className="alert alert-warning">Invalid Login</div>}
                <div className="block" style={{paddingTop:"198.5px"}}>                
                    <div>
                        <input type="text" className="form-control" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" required/>
                        <input type="password" className="form-control" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" required/>      
                    </div>
                    <div className="right_align">
                        {/* <a href="ForgotPasswordPage.html" target="blank" style={{color: "white"}}>Forgot password?</a><br/> */}
                        <Link className="login_link" to="/register">Register</Link>
                    </div>              
                </div> 
                <button className="button" onClick={this.loginClicked}>Login</button>
            </>
        );
    }
}

export default LoginComponent