import React from 'react';
import jwt from 'jwt-decode';
import {Route} from 'react-router-dom';

export const AdminProtected = ({component: Component, ...rest}) => {
    const token = localStorage.getItem('auth-token');
    if (!token || jwt(token).role !== 'admin') {
        return <h1> Access denied </h1>
    }

    return (
        <Route 
            {...rest} 
            render={props=>{
                return <Component {...props} />
            }}
    />
    );
}

export const StaffProtected = ({component: Component, ...rest}) => {
    const token = localStorage.getItem('auth-token');
    if (!token || jwt(token).role !== 'staff') {
        return <h1> Access denied </h1>
    }

    return (
        <Route 
            {...rest} 
            render={props=>{
                return <Component {...props} />
            }}
    />
    );
}

export const StudentProtected = ({component: Component, ...rest}) => {
    const token = localStorage.getItem('auth-token');
    if (!token || jwt(token).role !== 'student') {
        return <h1> Access denied </h1>
    }

    return (
        <Route 
            {...rest} 
            render={props=>{
                return <Component {...props} />
            }}
    />
    );
}

export const AdminStaffProtected = ({component: Component, ...rest}) => {
    const token = localStorage.getItem('auth-token');
    if (!token || jwt(token).role === 'student') {
        return <h1> Access denied </h1>
    }

    return (
        <Route 
            {...rest} 
            render={props=>{
                return <Component {...props} />
            }}
    />
    );
}