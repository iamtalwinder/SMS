import React from 'react';
import axios from 'axios';
import {Input, RadioInput, Icon} from '../../utilities';

export class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            email: '',
            password: '',
            confirmPassword: '',
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
            url: '/api/user/register',
            data: {
                fname: this.state.fname,
                lname: this.state.lname,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword,
                role: this.state.role
            },
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')  
            }
          })
          .then(response => {
            this.setState({
                error: response.data,
                status: 'success'
            });
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
        return(
            <div className="row justify-content-center mr-lg-250">
                <div className="col-xs-12 col-md-8 col-xl-5">

                    <div className={"card shadow mt-5 border-" + this.state.status}>

                        <div className="card-body">
                            <h2 className="card-title mt-4 text-center">Register User</h2>

                            <form className="mt-5">

                                <div className="form-group row justify-content-center">
                                    <Icon 
                                        icon='fas fa-user'
                                    />

                                    <Input
                                        type='text'
                                        name='fname'
                                        placeholder='First Name'
                                        inputCol='col-6 col-lg-4'
                                        value={this.state.fname}
                                        onChange={this.handleChange}
                                    />

                                    <Input
                                        type='text'
                                        name='lname'
                                        placeholder='Last Name'
                                        inputCol='col-5 col-lg-4'
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
			    			    </div>

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
                                        icon='fas fa-key'
                                    />

                                    <Input 
                                        type='password'
                                        name='confirmPassword'
                                        placeholder='Confirm Password'
                                        value={this.state.confirmPassword}
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
			    				    Register</button>
			    			    </div>

                            </form>

                            <div className="row error-box justify-content-center">
                                <div className="col-12 col-lg-8">
                                    <p className={'text-' +this.state.status}>{this.state.error}</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export class RemoveUser extends React.Component {
    render() {
        return(
            <div>Feature coming soon</div>
        );
    }
}

export class EditUser extends React.Component {
    render() {
        return(
            <div>Feature coming soon</div>
        );
    }
}

export class ViewAllUsers extends React.Component {
    render() {
        return(
            <div>Feature coming soon</div>
        );
    }
}