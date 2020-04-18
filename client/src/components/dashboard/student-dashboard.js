import React from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';
import { SidebarHeader, NavItem} from '../side-nav';

class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true,
            active: 'My Profile'
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleMyProfile = this.handleMyProfile.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize.bind(this));
    }

    componentWillUnmountMount() {
        window.removeEventListener("resize", this.handleResize.bind(this));
    }

    handleResize() {
        if (window.outerWidth >= 992) {
            this.setState({isHidden: true});
            this.handleToggle();
        } else {
            this.setState({isHidden: false});
            this.handleToggle();
        }
    }

    handleToggle() {
        if (this.state.isHidden) {
            document.getElementById('sidebar-container').style.marginLeft = '0px';
            document.getElementById('content').style.marginLeft = '250px';
			this.setState({isHidden: false});
		}
		else {
            document.getElementById('sidebar-container').style.marginLeft = '-250px';
            document.getElementById('content').style.marginLeft = '0px';
			this.setState({isHidden: true});
		}
    }

    handleMyProfile() {
        this.setState({active: 'My Profile'});
    }

    handleLogout() {
        axios({
            method: 'delete',
            url: '/api/user/logout',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('auth-token') 
            }
          })
          .then(response => {
              localStorage.removeItem('auth-token');
              this.props.history.push('/');
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
          <div className='wrapper'>
              <div id='sidebar-container' style={{background: "url('sidebar-5.jpg')"}}>
                    <nav id='sidebar'>
                        <SidebarHeader
                            initials={user.fname[0]+user.lname[0]}
                            name = {user.fname + ' ' + user.lname}
                            email = {user.email} 
                        />

                        <ul className='list-unstyled mt-4'>
                            <NavItem 
                                icon='fas fa-user-circle'
                                name='My Profile'
                                onClick={this.handleMyProfile}
                            />

                            <NavItem 
                                icon='fas fa-power-off'
                                name='Logout'
                                onClick={this.handleLogout}
                            />
                        </ul>
                    </nav>
                </div>

                <div id='content'>
                    <div className='conainer-fluid'>

                        <div className='row'>
                            <nav className='navbar navbar-expand-lg navbar-light bg-light shadow sticky-top col-12'>
                                <button type='button' className='btn btn-primary d-lg-none' onClick={this.handleToggle}>
                                    <i className='fas fa-align-left'></i>
                                </button>
                                <h3 id='heading'>{this.state.active}</h3>
                            </nav>
                        </div>

                        <div className='row'>
                            <div className='col-12'>main content</div>
                        </div>

                    </div>
                </div>
          </div>
        );
    }
}

export default AdminDashboard;