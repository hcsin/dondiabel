import React, {Component} from 'react'
import DemoDataService from '../api/DemoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import {Link} from 'react-router-dom'
import {USER_NAME_SESSION_ATTRIBUTE_NAME} from "./AuthenticationService";
import {API_URL} from "../../Constants";
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import UserDataService from "../api/UserDataService";

class MembersComponenten extends Component {

    constructor(props) {
        super(props);
        this.state = {users: [], isLoading: true};
        // this.remove = this.remove.bind(this);
    }

    componentDidMount() {
        this.refreshMembers()
    }
    refreshMembers = () => {
        this.setState({isLoading: true});
        fetch(`${API_URL}/members`)
            .then(response => response.json())
            .then(data => this.setState({users: data, isLoading: false}));
    }

    deleteUserClicked = (id) => {
        UserDataService.deleteUser(id)
            .then(response =>{
                    // this.setState({message:`Delete of user ${id} Succesful`});
                    this.refreshMembers();
                }
            )
    }

    render() {
        const {users, isLoading} = this.state;

        if (isLoading) {
            return <p>Loading...</p>;
        }

        const userList = users.map(user => {
//            const address = `${user.address || ''} ${user.city || ''} ${user.stateOrProvince || ''}`;
            return <tr key={user.id}>
                <td style={{whiteSpace: 'nowrap'}}>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.role}</td>
                <td>
                    <ButtonGroup>
                        {/*<Button size="sm" tag={Link} to={"/members/" + user.id}>Edit</Button>*/}
                        <button size="sm" onClick={() => this.deleteUserClicked(user.id)}>Delete</button>
                    </ButtonGroup>
                </td>
            </tr>
        });

        return (
            <div>
                <Container fluid>
                    <div className="float-right">
                        <Button size="sm" tag={Link} to="/adduser">Add User</Button>
                    </div>
                    <h3>List of members</h3>
                    <Table className="mt-4">
                        <thead>
                        <tr>
                            <th width="20%">ID</th>
                            <th width="20%">E-mail</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th width="10%">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userList}
                        </tbody>
                    </Table>
                </Container>
            </div>
        );
    }
}

export default MembersComponenten