import React, {Component} from 'react'
import moment from 'moment'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import TodoDataService from '../api/DemoDataService.js'
import AuthenticationService from './AuthenticationService.js'
import '../../App.css'

class AddDemoComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            description: "",
            targetDate : moment(new Date()).format("YYYY-MM-DD")
        }
    }

    componentDidMount(){
    if(this.state.id===-1){
        return
    }

        let username = AuthenticationService.getLoggedInUsername()
        TodoDataService.retrieveTodo(username, this.state.id)
        .then(response => this.setState({
            description: response.data.description,
            targetDate : moment(response.data.targetDate).format("YYYY-MM-DD")
        }))
    }

    validate = (values) => {
        let errors = {}
        if(!values.description){
            errors.description = "Enter a description"
        } else if(values.description.length<5){
            errors.description = "Enter atleast 5 characters"
        } if(!moment(values.targetDate).isValid()) {
            errors.targetDate = "Enter a valid date"
        }
        return errors;
    }
    onSubmit = (values) =>{
        //console.log(values);
        let username = AuthenticationService.getLoggedInUsername()
        let todo = {username: AuthenticationService.getLoggedInUsername(),
                    id: this.state.id,
                    description: values.description, 
                    targetDate: values.targetDate}

        if(this.state.id===-1){
            TodoDataService.createTodo(username, todo
            // {username: AuthenticationService.getLoggedInUsername(),
            // id: this.state.id,
            // description: values.description, 
            // targetDate: values.targetDate}
            )
                .then(() => this.props.history.push("/todos"))
        }else{
            TodoDataService.updateTodo(username, this.state.id, todo)
                .then(() => this.props.history.push("/todos"))
        }
    }

    render(){
        let {description, targetDate} = this.state
        //let targetDate = this.state.targetDate

        return <div>
            <h1 className="title">UPLOAD DEMO</h1>
            <div className="container">
                <Formik                     
                    // initialValues={{description: description, targetDate: targetDate}}
                    initialValues={{description, targetDate}}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                >        
                    {(props) => (
                        <Form>
                            <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                            <fieldset className="form-group">
                                <label>description</label>
                                <Field className="form-control" type="text" name="description"/>
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Target Date</label>
                                <Field className="form-control" type="date" name="targetDate"/>
                            </fieldset>
                            <button className="button" type="submit">Save</button>
                        </Form>                        
                    )}
                </Formik>                
            </div>            
        </div>
    }    
}

export default AddDemoComponent