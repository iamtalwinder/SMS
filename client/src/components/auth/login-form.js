import React from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';
import {Input, RadioInput, Icon} from '../utilities';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            role: '',
            error: '',
            status: 'primary'
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios({
            method: 'post',
            url: '/api/user/login',
            data: {
                email: this.state.email,
                password: this.state.password,
                role: this.state.role
            },
            headers: {
                'Content-Type': 'application/json' 
            }
          })
          .then(response => {
            localStorage.setItem('auth-token', response.data);
            this.props.history.push(`/${this.state.role}-dashboard`);
          })
          .catch(err => {
            if (err.response) {
                this.setState({
                    error: err.response.data,
                    status: 'danger'
                });
            } else {
                this.setState({
                    error: 'Request Failed',
                    status: 'danger'
                });
            }
          });
    }

    render() {
        //If user is already logged in
        if (localStorage.getItem('auth-token')) {
            const user = jwt(localStorage.getItem('auth-token'));
            this.props.history.push(`/${user.role}-dashboard`);
        }
        return(
            <div className = "container">
                <div className="row justify-content-center">
                    <div className="col-xs-12 col-md-10 col-lg-8 col-xl-6">

                        <div className={"card shadow mt-5 border-" + this.state.status}>

                            <div className="card-body">
                                <h2 className="card-title mt-4 text-center">Login</h2>

                                <form className="mt-5">

                                    <div className="form-group row justify-content-center">
                                        <Icon 
                                            icon='fas fa-envelope'
                                        />

                                        <Input
                                            type='email'
                                            name='email'
                                            placeholder='Email'
                                            value={this.state.email}
                                            onChange={this.handleChange}
                                        />
			    			        </div>

                                    <div className="form-group row justify-content-center">
                                        <Icon 
                                            icon='fas fa-lock'
                                        />

                                        <Input 
                                            type='password'
                                            name='password'
                                            placeholder='Password'
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                        />
                                    </div>

                                    <div className="form-group row justify-content-center">
                                        <Icon
                                            icon='fas fa-user'
                                        />

                                        <div className="col-11 col-lg-8">
			    					
			    					        <RadioInput
                                                name='role'
                                                value='admin'
                                                label='Admin'
                                                onChange={this.handleChange}
                                            />

                                            <RadioInput 
                                                name='role'
                                                value='staff'
                                                label='Staff'
                                                onChange={this.handleChange}
                                            />

                                            <RadioInput 
                                                name='role'
                                                value='student'
                                                label='Student'
                                                onChange={this.handleChange}
                                            />
									    </div>

			    				    </div>

                                    <div className="form-group row justify-content-center my-5">
                                        <button 
                                            type="submit" 
                                            className={"col-12 col-lg-8 btn btn-block btn-" + this.state.status} 
                                            style={{borderRadius: '50px'}}
                                            onClick={this.handleSubmit}
                                        >
			    				        Login</button>
			    			        </div>

                                </form>

                                <div className="row mt-2 error-box justify-content-center">
                                    <div className="col-12 col-lg-8">
                                        <p className={'text-' +this.state.status}>{this.state.error}</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginForm;