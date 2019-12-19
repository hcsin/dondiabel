import axios from "axios"
import {API_URL} from "../../Constants"

export const USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser"

class AuthenticationService {

    executeBasicAuthenticationService(username, password){        
        return axios.get(`${API_URL}/basicauth`, 
        {headers: {authorization: this.createBasicAuthToken(username, password)}})
    }

    //when a user logged in, call the jwt authenticate service
    //no need for a header, send a post request with username and password
    executeJwtAuthenticationService(username, password){        
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        })
    }

    createBasicAuthToken(username, password){
        return "Basic " + window.btoa(username + ":" + password)
    }    

    registerSuccessfulLogin(username, password){
        // let username = "in28min"
        // let password = "pass123"        
        //let basicAuthHeader = "Basic " + window.btoa(username + ":" + password)
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setupAxiosInterceptors(this.createBasicAuthToken(username, password))
    }
    
    createJwtToken(token){
        return "Bearer " + token
    }

    registerSuccessfulLoginForJws(username, token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        //every http request from now on needs to use the token, wich came in response
        //token is created in backend
        this.setupAxiosInterceptors(this.createJwtToken(token))
    }

    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user===null) return false
        return true
    }

    getLoggedInUsername(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if(user===null) return ""
        return user
    }

    setupAxiosInterceptors(token){
        // let username = "in28min"
        // let password = "pass123"        
        // let basicAuthHeader = "Basic " + window.btoa(username + ":" + password)
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()){
                    config.headers.authorization = token
                }
                return config
            }
        )
    }

}

export default new AuthenticationService()
