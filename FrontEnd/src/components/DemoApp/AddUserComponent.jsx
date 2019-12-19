import React, {Component} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import UserDataService from '../api/UserDataService.js'
import '../../App.css'

//control component the React component that renders a form
//also controls what happens in that form on subsequent user input (this.state)
class AddUserComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.match.params.id,
            username: "",
            email: "",
            password: "",
            passwordConfirm: "",
            role: "",
            showErrorMessage: false
        }
    }

    validate = (values) => {
        let errors = {}
        if(!values.username){
            errors.username = "Enter a username"
        } if(values.username>20){
            errors.password = "Username must be between 3 - 20 characters"
        } if(values.username<3){
            errors.password = "Username must be between 3 - 20 characters"
        } if(!values.email){
            errors.email = "Enter a email"
        } if(!values.password){
            errors.password = "Enter a password"
        } if(values.password !== values.passwordConfirm){
            errors.password = "Passwords don't match"
        } if(values.password>40){
            errors.password = "Password must be between 8 - 40 characters"
        } if(values.password<8){
            errors.password = "Password must be between 8 - 40 characters"
        } //else if(!values.username){
        //     errors.username = "Username already exists"
        // }
        return errors;
    }

    onSubmit = (values) =>{
        //console.log(values);
        let user = {id: this.state.id,
            username: values.username,
            email: values.email,
            password: values.password,
            role: values.role}

        UserDataService.createUser(user)        //create user
            .then(() => this.props.history.push("/members"))        //go back to
            .catch(() => {
                this.setState({showErrorMessage:true})
            });
    }

    render(){
        let {username, email, password, passwordConfirm, role, showErrorMessage} = this.state

        return <div>
            {/* <h1 className="title">UPLOAD DEMO</h1> */}
            <div>
                <Formik
                    // initialValues={{description: description, targetDate: targetDate}}
                    initialValues={{username, email, password, role, passwordConfirm, showErrorMessage}}
                    onSubmit={this.onSubmit}
                    validateOnChange={false}
                    validateOnBlur={false}
                    validate={this.validate}
                    enableReinitialize={true}
                >
                    {(props) => (
                        <Form>
                            <ErrorMessage name="username" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="email" component="div" className="alert alert-warning"/>
                            <ErrorMessage name="password" component="div" className="alert alert-warning"/>
                            {this.state.showErrorMessage && <div className="alert alert-warning">Username or Email already exists</div>}
                            <div className="block">
                                <div>
                                    <Field autoComplete="off" className="form-control" type="text" name="username" placeholder="Username" minLength="3" maxLength="20"/>
                                    <Field autoComplete="off" className="form-control" type="email" name="email" placeholder="E-mail"/>
                                    <Field className="form-control" type="password" name="password" placeholder="Password" minLength="8" maxLength="40"/>
                                    <Field className="form-control" type="password" name="passwordConfirm" placeholder="Password Confirm" minLength="8" maxLength="40"/>
                                </div>
                                    <div className="icon-block">
                                        <div className="mb-3">
                                            <Field as="select" name="role">
                                                <option value="ROLE_USER">User</option>
                                                <option value="ROLE_ADMIN">Admin</option>
                                                <option value="ROLE_BACK">Backoffice</option>
                                            </Field>
                                        </div>
                                    </div>
                            </div>
                            <button className="button" type="submit">Register</button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    }
}

export default AddUserComponent