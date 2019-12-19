import axios from 'axios'
import {API_URL} from "../../Constants"

class DemoDataService {
    retrieveAllDemos(){
        return axios.get(`${API_URL}/demos`)
    }

    retrieveAllDemosUser(username){
        return axios.get(`${API_URL}/demos/${username}`)
    }

    retrieveDemo(name, id){
        return axios.get(`${API_URL}/users/${name}/demos/${id}`)
    }

    deleteDemo(name, id){
        return axios.delete(`${API_URL}/users/${name}/demos/${id}`)
    }

    updateDemo(name, id, demo){
        return axios.put(`${API_URL}/users/${name}/demos/${id}`, demo)
    }

    createDemo(name, demo){
        return axios.post(`${API_URL}/users/${name}/demos`, demo)
    }
}

export default new DemoDataService()
