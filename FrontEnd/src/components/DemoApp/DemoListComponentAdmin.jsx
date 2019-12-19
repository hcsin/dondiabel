import React, {Component} from 'react'
import DemoDataService from '../api/DemoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment';

class DemoListComponentAdmin extends Component {
    constructor(props){
        super(props)
        this.state = {
            demos: [],
            message : null
        }
    }

    componentDidMount() {
        this.refreshDemos();
    }

    refreshDemos = () => {
        DemoDataService.retrieveAllDemos()
            .then(
                response => {
                    this.setState({demos : response.data})
                })
    }

    deleteDemoClicked = (id, trackName) => {
        let name = AuthenticationService.getLoggedInUsername()
        DemoDataService.deleteDemo(name, id)
            .then(response =>{
                    this.setState({message:`Delete of demo ${trackName} Succesful`});
                    this.refreshDemos();
                }
            )
    }

    updateDemoClicked = (id) => {
        this.props.history.push(`/demos/${id}`)
    }

    render(){
        return (
            <div>
                {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
                <h1 className="title">DEMO'S</h1>
                <div className="container demo-web">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>File</th>
                            <th>Date</th>
                            <th>User</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
//map() method is used to iterate over an array and calling function on every element of array.
                            this.state.demos.reverse().map (
                                demo =>
                                    <tr key={demo.id}>
                                        <td>{demo.id}</td>
                                        <td>
                                            <audio style={{borderRadius:"0px"}} className="audio" controls>
                                                <source style={{borderRadius:"0px"}} src={`data:audio/mp3;base64,${demo.data}`} type="audio/mpeg" controls="controls"/>
                                                Your browser does not support the audio element.
                                            </audio>
                                        </td>
                                        <td>{moment(demo.date).format('DD-MM-YYYY')}</td>
                                        <td>{demo.username}</td>
                                        <td>{demo.trackName}</td>
                                        <td>{demo.description}</td>
                                        {/* <td><button className="button button_small" onClick={() => this.updateDemoClicked(demo.id)}>View</button></td> */}
                                        <td><button className="button button_small" onClick={() => this.deleteDemoClicked(demo.id, demo.trackName)}>Delete</button></td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <div className="container demo-mobile">
                    <table className="table" style={{maxWidth:"100%"}}>
                        <thead>
                        <tr>
                            <th>id</th>
                            <th>File</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.demos.map(
                                demo =>
                                    <tr key={demo.id}>
                                        <td>{demo.id}</td>
                                        <td>
                                            <audio className="audio" controls>
                                                <source src={`data:audio/mp3;base64,${demo.data}`} type="audio/mpeg" controls="controls"/>
                                                Your browser does not support the audio element.
                                            </audio>
                                            <ul className="audio_desc">
                                                <li className="demo_li">{demo.username}</li>
                                                <li className="demo_li">{demo.trackName}</li>
                                                <li className="demo_li">{moment(demo.date).format('DD-MM-YYYY')}</li>
                                            </ul>
                                        </td>
                                        <td><button className="button button_small" onClick={() => this.deleteDemoClicked(demo.id)}>Delete</button></td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default DemoListComponentAdmin