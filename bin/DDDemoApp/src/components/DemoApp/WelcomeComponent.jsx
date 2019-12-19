import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import HelloWorldService from "../api/HelloWorldService.js"

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.state={welcomeMessage:""}
    }

    render(){
        return <div>
            <h1 className="title">Welcome!</h1>
            <div className="container">
                Welcome {this.props.match.params.name}.
                You can manage your todos <Link to="/todos">here</Link>.
            </div>
            {/* <div className="container">
                Click here to get a customized welcome message.
                <button onClick={this.retrieveWelcomeMessage}>Get Welcome Message </button>
            </div>
            <div className="container">
                {this.state.welcomeMessage}
            </div> */}
            {/* <div className="container">
                {this.state.errorMessage}
            </div> */}
        </div>
    }
    retrieveWelcomeMessage=()=>{        //asynchronous operation (axios)
        // HelloWorldService.executeHelloWorldService()
        // .then(response => this.handleSuccesfulResponse(response))    
        // HelloWorldService.executeHelloWorldBeanService()
        // .then(response => this.handleSuccesfulResponse(response))       //succes response
        HelloWorldService.executeHelloWorldPathVariableService(this.props.match.params.name)
        .then(response => this.handleSuccesfulResponse(response))
        .catch(error => this.handleError(error))        //fail response
    }

    handleSuccesfulResponse=(response)=>{
        console.log(response)
        this.setState({welcomeMessage: response.data.message})        
    }
    handleError=(error)=>{
        console.log(error.response)
        let errorMessage= "";
        if (error.message)
            errorMessage += error.message 
        if (error.response && error.response.data){
            errorMessage += error.respone.data.message
        }
        this.setState({welcomeMessage: errorMessage})        
    }
}


export default WelcomeComponent