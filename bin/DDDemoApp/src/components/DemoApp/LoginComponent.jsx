import React, {Component} from 'react'
import AuthenticationService from './AuthenticationService.js'
import Hexagon_logo_vector from '../images/Hexagon logo Don Diablo vector FillWhite.png'
import '../../App.css'

class LoginComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            username: "in28min",
            password: "",
            wasLoginSuccesful: false,
            showErrorMessage: false
        }
    }
    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]
                :event.target.value
            }
        )
    }
    loginClicked = () => {
        //instead of password we need a token, token comes from response.data
        AuthenticationService
        .executeJwtAuthenticationService(this.state.username,this.state.password)
        .then((response) => {                
            AuthenticationService.registerSuccessfulLoginForJws(this.state.username, response.data.token);
            this.props.history.push(`/welcome/${this.state.username}`)
            }).catch(() => {
                this.setState({showErrorMessage:true})
                this.setState({wasLoginSuccesful:false})
            })
        }  

    render(){
        return (
            <>                
                <img id="Hexagon_logo_vector" alt="" src={Hexagon_logo_vector}/>
                <div id="register_block">
                {this.state.wasLoginSuccesful && <div>Login Succesful</div>}
                {this.state.showErrorMessage && <div className="alert alert-warning">Invalid Login</div>}
                    <div id="fields">
                        <div id="login_padding">
                            <input type="text" className="field" name="username" value={this.state.username} onChange={this.handleChange} placeholder="Username" required/><br/>
                            <input type="password" className="field" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Password" required/>      
                        </div>
                    </div>
                    <div class="right_align">
                        <a href="ForgotPasswordPage.html" target="blank" style={{color: "white"}}>Forgot password?</a><br/>
                        <a href="RegisterPage.html" target="blank" style={{color: "white"}}>Register</a>
                    </div>              
                </div> 
                <button className="button" onClick={this.loginClicked}>Login</button>
            </>
        );
    }
}

export default LoginComponent