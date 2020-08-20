import React from 'react';
import './App.css';
import Image from './Componants/UploadImage';
import SignUp from './Componants/signUp-business/signUp';
import SignupClient from './Componants/Sign-up-client/signup-client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './Componants/navbar/navbar';
import Home from './Componants/home/App';
import Res from './Componants/restaurant/res';
import Carousel from './Componants/carousel/carousel';
import Menu from './Componants/menu/menu';
import payment from './Componants/payment/payout';
import Orders from './Componants/businessOrders/orders';
import Order from './Componants/ordered/ordered';
import User from './Componants/userpage/userpage';
import Notify from './Componants/notifyTest/notification';
import EmailConfirmation from './Componants/emailConfirmation/emailConfirmation';
//----------- private route ---------//
import {
  BusinessPrivateRoute,
  UserPrivateRoute,
  SignIn,
} from './Componants/SignIn/SignIn';
//--------- private route ---------------//
function App() {
  return (
    <Router>
      <div className='App'>
        <Nav />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/sign-upClient' component={SignupClient} />
          <Route exact path='/sign-upBusiness' component={SignUp} />
          <Route exact path='/sign-in' component={SignIn} />
          <UserPrivateRoute exact path='/menu' component={Menu} />
          <BusinessPrivateRoute exact path='/res' component={Res} />
          <UserPrivateRoute exact path='/upload' component={Image} />
          <Route exact path='/c' component={Carousel} />
          <UserPrivateRoute exact path='/payment' component={payment} />
          <BusinessPrivateRoute exact path='/orders' component={Orders} />
          <UserPrivateRoute exact path='/order' component={Order} />
          <UserPrivateRoute exact path='/userpage' component={User} />
          <Route exact path='/notify' component={Notify} />
          <Route
            exact
            path='/emailConfirmation/:userId'
            component={EmailConfirmation}
          />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
