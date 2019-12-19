import React, {Component, useState} from 'react'
import '../../App.css'
import axios from 'axios';
import {API_URL} from "../../Constants"

function submitForm(contentType, data, setResponse) {
    axios({
        url: `${API_URL}/users/{username}/demos`,
        method: 'POST',
        data: data,
        headers: {
            'Content-Type': contentType
        }
    }).then((response) => {
        setResponse(response.data);
    }).catch((error) => {
        setResponse("error");
    })
}
class AddDemoComponent extends Component {

    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            demoname: "",
            description: "",
            file : ""
        }
    }

    validate = (values) => {
        let errors = {}
        if(!values.demoname){
            errors.demoname = "Enter a demo name"
        }else{
            if(!values.file){
                errors.file = "Choose a demo"
            }
            if(!values.description){
                console.log(values.file.name)
                errors.description = "Enter a description"
            } else if(values.description.length<5){
                errors.description = "Enter at least 5 characters"
            }
        }
        console.log("demo" + values.file)
        return errors;
    }

    onSubmit = (values) =>{
        const [demoname, setDemoname] = useState("");
        const [file, setFile] = useState(null);
        const [description, setDescription] = useState("");
        // //console.log(values);
        // let username = AuthenticationService.getLoggedInUsername()
        // let demo = {username: AuthenticationService.getLoggedInUsername(),
        //     id: this.state.id,
        //     demoname: values.demoname,
        //     description: values.description}
        const formData = new FormData();
        formData.append("demoname", demoname);
        formData.append("file", file);
        formData.append("description", description);

        submitForm("multipart/form-data", formData, (msg) => console.log(msg));
        // if(this.state.id===-1){
        //     DemoDataService.createDemo(username, demo
        //         // {username: AuthenticationService.getLoggedInUsername(),
        //         // id: this.state.id,
        //         // description: values.description,
        //         // targetDate: values.targetDate}
        //     )
        //         .then(() => this.props.history.push("/demos"))
        // }else{
        //     DemoDataService.updateDemo(username, this.state.id, demo)
        //         .then(() => this.props.history.push("/demos"))
        // }
    }

    render(){
        let {demoname, description, file} = this.state
        //let targetDate = this.state.targetDate

        return <div>
            <h1 className="title">UPLOAD DEMO</h1>
            <div>
                {/*{this.state.showError && <div className="error-message">Oops! Something went wrong!</div>}*/}
                <form onSubmit={this.onSubmit}>
                            <div className="container">
                                <fieldset className="form-group">
                                    <label>Demo name</label>
                                    <input autoComplete="off" className="form-control" type="text" name="demoname"/>
                                </fieldset>
                                <label>
                                 <label>File upload</label><br/>
                                    <input id="file" name="file" type="file" onChange={(event) => {
                                        this.setState(event.currentTarget.files[0]);
                                    }} className="form-control"/>

                                    {/*<input type="file" name="file" onChange={(e) => this.setState(e.target.files[0])} accept=".mp3"/>*/}
                                    {/*<input type="file" name="file" accept=".mp3"/>*/}
                                </label><br/>
                                <fieldset className="form-group">
                                    <label>Description</label>
                                    <input autoComplete="off" className="form-control" type="text" name="description"/>
                                </fieldset>
                                {/*<input className="button"  type="button" value="Upload" onClick={onSubmit} />*/}

                                <button className="button_small" type="submit">Save</button>
                            </div>
                </form>
            </div>
        </div>
    }
}

export default AddDemoComponent