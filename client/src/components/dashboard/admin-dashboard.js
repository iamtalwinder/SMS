import React from 'react';
import axios from 'axios';
import jwt from 'jwt-decode';
import { SidebarHeader, NavItem, NavDropdown} from '../side-nav';
import MyProfile from './dashboard-component/my-profile';
import Feedbacks from './dashboard-component/feedbacks';
import {MakeAnnouncement, ViewAllAnnounements} from './dashboard-component/announcements';
import * as manageUser from './dashboard-component/manage-users';
 
class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true,
            activeTitle: 'My Profile'
        };

        this.manageUser = [

            {
                icon: 'fas fa-user-plus',
                name: 'Add User',
                onClick: this.handleAddUser.bind(this)
            },

            {
                icon: 'fas fa-user-minus',
                name: 'Remove User',
                onClick: this.handleRemoveUser.bind(this)
            },

            {
                icon: 'fas fa-user-edit',
                name: 'Edit User',
                onClick: this.handleEditUser.bind(this)
            },

            {
                icon: 'fas fa-users',
                name: 'View All',
                onClick: this.handleViewAllUsers.bind(this)
            }
        ];

        this.announcements = [

            {
                icon: 'fas fa-pen',
                name: 'Publish',
                onClick: this.handlePublish.bind(this)
            },

            {
                icon: 'fas fa-scroll',
                name: 'View All',
                onClick: this.handleViewAllAnnouncements.bind(this)
            }
        ];

        this.handleToggle = this.handleToggle.bind(this);
        this.handleMyProfile = this.handleMyProfile.bind(this);
        this.handleFeedbacks = this.handleFeedbacks.bind(this);
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

    hideOnSmallDevice() {
        if (window.outerWidth < 992) {
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
        this.setState({
            activeTitle: 'My Profile'
        });
        this.hideOnSmallDevice();
    }

    handleAddUser() {
        this.setState({
            activeTitle: 'Add User'
        });
        this.hideOnSmallDevice();
    }

    handleRemoveUser() {
        this.setState({
            activeTitle: 'Remove User'
        });
        this.hideOnSmallDevice();
    }

    handleEditUser() {
        this.setState({
            activeTitle: 'Edit User'
        });
        this.hideOnSmallDevice();
    }

    handleViewAllUsers() {
        this.setState({
            activeTitle: 'All Users'
        });
        this.hideOnSmallDevice();
    }

    handlePublish() {
        this.setState({
            activeTitle: 'Make Announcement'
        });
        this.hideOnSmallDevice();
    }

    handleViewAllAnnouncements() {
        this.setState({
            activeTitle: 'All Announcements'
        });
        this.hideOnSmallDevice();
    }

    handleFeedbacks() {
        this.setState({
            activeTitle: 'Feedbacks'
        });
        this.hideOnSmallDevice();
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
                                key="My Profile"
                            />

                            <NavDropdown
                                icon='fas fa-users-cog'
                                name='Manage User'
                                id='manage-user'
                                items={this.manageUser}
                                key="Manage User"
                            />

                            <NavDropdown
                                icon='fas fa-bullhorn'
                                name='Announcements'
                                id='announcements'
                                items={this.announcements}
                                key="Announcements"
                            />

                            <NavItem 
                                icon='fas fa-rss'
                                name='Feedbacks'
                                onClick={this.handleFeedbacks}
                                key="Feedbacks"
                            />

                            <NavItem 
                                icon='fas fa-power-off'
                                name='Logout'
                                onClick={this.handleLogout}
                                key="Logout"
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
                                <h3 id='heading'>{this.state.activeTitle}</h3>
                            </nav>
                        </div>

                        <div className='row'>
                            <div className='col-12'>
                                {(()=>{
                                        switch(this.state.activeTitle) {
                                            case 'My Profile':
                                                return  <MyProfile />;
                                            
                                            case 'Add User':
                                                return <manageUser.AddUser />;

                                            case 'Remove User':
                                                return <manageUser.RemoveUser />;

                                            case 'Edit User':
                                                return <manageUser.EditUser />;

                                            case 'All Users':
                                                return <manageUser.ViewAllUsers />;

                                            case 'Make Announcement':
                                                return <MakeAnnouncement />;

                                            case 'All Announcements':
                                                return <ViewAllAnnounements />;

                                            case 'Feedbacks':
                                                return  <Feedbacks />;

                                            default:
                                                return <MyProfile />
                                        }
                                    })()
                                }
                            </div>
                        </div>

                    </div>
                </div>
          </div>
        );
    }
}

export default AdminDashboard;