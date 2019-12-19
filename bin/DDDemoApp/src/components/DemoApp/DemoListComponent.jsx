import React, {Component} from 'react'
import TodoDataService from '../api/DemoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class ListTodosComponent extends Component {
    constructor(props){             //gets called when component is being initialized
        super(props)
        this.state = {
            todos: 
            [               //better not to do initial API call directly in the constructor, otherwise state will not be initialized until API call is completed
            //{id:1, description:"Learn React", done:false, targetDate:new Date()}, 
            //{id:2, description:"Cry", done:false, targetDate:new Date()}
            ], 
            message : null
        }
    }

    componentDidMount() { 
        this.refreshTodos();
    }    

    refreshTodos = () => {
        let username = AuthenticationService.getLoggedInUsername()
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
            this.setState({todos : response.data})
        })
    }

    deleteTodoClicked = (id) => {
        let username = AuthenticationService.getLoggedInUsername()
        TodoDataService.deleteTodo(username, id)
        .then (
            response =>{
                this.setState({message:`Delete of todo ${id} Succesful`});
                this.refreshTodos();
            }
        )
    }

    updateTodoClicked = (id) => {
        this.props.history.push(`/todos/${id}`)
    }

    addTodoClicked = () => {
        this.props.history.push(`/todos/-1`)
    }

    render(){
        return (
        <div>
            
            {this.state.message && <div className="alert alert-success">{this.state.message}</div>}
            <h1 className="title">DEMO'S</h1>
            <div className="container">            
            <table className="table">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>user</th>
                        <th>description</th>
                        <th>Upload Date</th>
                        <th>Status</th>
                        {/* <th>Update</th>
                        <th>Delete</th> */}
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.todos.map (
                            todo =>                        
                            <tr key={todo.id}>
                                <td>{todo.id}</td>
                                <td>{todo.username}</td>
                                <td>{todo.description}</td>
                                <td>{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
                                <td>{todo.isDone.toString()}</td>                                
                                {/* <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td> */}
                            </tr>
                        )
                    }
                </tbody>
            </table>
            <div className="row">
                <button className="button" onClick={this.addTodoClicked}>Add</button>
            </div>
            </div>
        </div>
        )
    }
}

export default ListTodosComponent