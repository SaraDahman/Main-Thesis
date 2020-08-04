import React from 'react';
import './App.css';
import Image from './Componants/UploadImage';
import SignupClient from './Componants/Sign-up-client/signup-client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './Componants/landing/landing';

function App() {
  return (
    <Router>
      <div className='App'>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/sign-up' component={SignupClient} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
