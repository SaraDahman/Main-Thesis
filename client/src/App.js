import React from 'react';
import './App.css';
// import Image from './Componants/UploadImage';
import SignUp from './Componants/signUp-business/signUp';
import SignupClient from './Componants/Sign-up-client/signup-client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './Componants/landing/landing';
import Nav from './Componants/navbar/navbar';
import SignIn from './Componants/SignIn/SignIn';
import Menu from './Componants/menu/menu';


function App() {
  return (
    <Router>
      <div className='App'>
        <Nav />
        <Switch>
          <Route exact path='/menu' component={Menu} />
          <Route exact path='/' component={Landing} />
          <Route exact path='/sign-upClient' component={SignupClient} />
          <Route exact path='/sign-upBusiness' component={SignUp} />
          <Route exact path='/sign-in' component={SignIn} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
