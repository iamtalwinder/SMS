import React from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';

class DeleteUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleDelete(event) {
        event.preventDefault();
        axios({
            method: 'delete',
            url: '/api/user/delete',
            data: {
                email: this.state.email
            },
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token')
            }
          })
          .then(response => {
            alert(response.data);
          })
          .catch(err => {
            if (err.response) {
                alert(err.response.data);
            } else {
                alert('Request failed!');
            }
          });
    }

    render() {
        const token = localStorage.getItem('auth-token');
        const user = jwt(token);
        return (
            <div>
                <label>E-mail:</label>
                <input
                    type='email'
                    name='email'
                    placeholder='E-mail'
                    value={this.state.email}
                    onChange={this.handleChange}
                    required
                />
                <button onClick = {this.handleDelete}>Delete</button>
                <div>
                    <button onClick = {() => this.props.history.push(`${user.role}-dashboard`)}>Back</button>
                </div>
            </div>      
        );
    }
}

export default DeleteUser;