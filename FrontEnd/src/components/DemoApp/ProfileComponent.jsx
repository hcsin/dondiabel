import React, {Component} from 'react'
import AuthenticationService, {USER_NAME_SESSION_ATTRIBUTE_NAME} from "./AuthenticationService";
import UserDataService from "../api/UserDataService"
import axios from 'axios'
import {API_URL} from "../../Constants"
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import {Link} from "react-router-dom";

// const username = AuthenticationService.getLoggedInUsername();



class ProfileComponent extends Component {
    emptyItem = {
        id: '',
        username: '',
        email: '',
        password: '',
        role: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        const username = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        console.log("profile " +username)
        if (username !== 'new') {
            const user = await (await fetch(`${API_URL}/members/${username}`)).json();
            this.setState({item: user});
            console.log(user)
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = {...this.state.item};
        item[name] = value;
        this.setState({item});
    }

    async handleSubmit(e) {
        e.preventDefault();
        const {item} = this.state;

        await fetch('/members/'+(item.id), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
    }

    render()
    {
        const {item} = this.state;
        const isAdmin = item.role === 'ROLE_USER';
        console.log(isAdmin)
        return (
            <div className="App" style={{marginLeft:"50px"}}>
                <div className="left">
                    <h1 className="title">Welcome {item.username}!</h1>
                </div>
                <div>
                    <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <Label for="id">Member id</Label>
                            <Input type="text" name="id" id="id" value={item.id}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="username">Username</Label>
                            <Input type="text" name="username" id="username" value={item.username}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">E-mail</Label>
                            <Input type="text" name="email" id="email" value={item.email}/>
                        </FormGroup>
                        {/*{isAdmin &&*/}
                        {/*<FormGroup>*/}
                        {/*    <div className="icon-block">*/}
                        {/*        <div className="mb-3">*/}
                        {/*            <select value={item.role} onChange={this.handleChange}>*/}
                        {/*                <option value="ROLE_USER">User</option>*/}
                        {/*                <option value="ROLE_ADMIN">Admin</option>*/}
                        {/*                <option value="ROLE_BACK">Backoffice</option>*/}
                        {/*            </select>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</FormGroup>}*/}
                        <FormGroup>
                            {/*<Button color="primary" type="submit">Save</Button>*/}
                        </FormGroup>
                    </Form>
                </div>
            </div>
        );
    }

}

export default ProfileComponent