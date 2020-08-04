import React from 'react';
import './App.css';
import Image from './Componants/UploadImage';
import SignUp from './Componants/signUp-business/signUp';
import SignupClient from './Componants/Sign-up-client/signup-client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './Componants/landing/landing';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/sign-upClient' component={SignupClient} />
          <Route exact path='/sign-upBusiness' component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
