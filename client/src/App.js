import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import LoginForm from './components/auth/login-form';
import AdminDashboard from './components/dashboard/admin-dashboard';
import StaffDashboard from './components/dashboard/staff-dashboard';
import StudentDashboard from './components/dashboard/student-dashboard';
import * as PR from './components/auth/verify-user';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path='/' exact component={LoginForm}/>
          <PR.AdminProtected path='/admin-dashboard' exact component={AdminDashboard}/>
          <PR.StaffProtected path='/staff-dashboard' exact component={StaffDashboard}/>
          <PR.StudentProtected path='/student-dashboard' exact component={StudentDashboard}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
