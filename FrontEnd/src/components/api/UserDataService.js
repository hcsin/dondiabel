import axios from 'axios'
import {API_URL} from "../../Constants"

class UserDataService {
    retrieveAllUsers(){
        return axios.get(`${API_URL}/members`)
    }

    retrieveUser(id){
        return axios.get(`${API_URL}/members/${id}`)
    }

    retrieveUserByUsername(username){
        return axios.get(`${API_URL}/members/${username}`)
    }

    retrieveUserRole(role){
        return axios.get(`${API_URL}/members/${role}`)
    }

    deleteUser(id){
        return axios.delete(`${API_URL}/members/${id}`)
    }

    updateUser(id){
        return axios.put(`${API_URL}/members/${id}`)
    }

    createUser(user){
        return axios.post(`${API_URL}/members`, user)
    }
}

export default new UserDataService()