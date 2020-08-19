import React from 'react';
import './App.css';
import Image from './Componants/UploadImage';
import SignUp from './Componants/signUp-business/signUp';
import SignupClient from './Componants/Sign-up-client/signup-client';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './Componants/landing/landing';
import Nav from './Componants/navbar/navbar';
// import SignIn from './Componants/SignIn/SignIn';
import Res from './Componants/restaurant/res';
import Carousel from './Componants/carousel/carousel';
import Menu from './Componants/menu/menu';
import payment from './Componants/payment/payout';
import Orders from './Componants/businessOrders/orders';
import Order from './Componants/ordered/ordered';
import User from './Componants/userpage/userpage';
import Notify from './Componants/notifyTest/notification';
import EmailConfirmation from './Componants/emailConfirmation/emailConfirmation';
<<<<<<< HEAD
//----------- private route ---------//
import { PrivateRoute, SignIn } from './Componants/SignIn/SignIn';
//--------- private route ---------------//
function App() {
  return (
    <Router>
      <div className='App'>
        <Nav />
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/sign-upClient' component={SignupClient} />
          <Route exact path='/sign-upBusiness' component={SignUp} />
          <Route exact path='/sign-in' component={SignIn} />
          <PrivateRoute exact path='/menu' component={Menu} />
          <PrivateRoute exact path='/res' component={Res} />
          <PrivateRoute exact path='/upload' component={Image} />
          <PrivateRoute exact path='/c' component={Carousel} />
          <PrivateRoute exact path='/payment' component={payment} />
          <PrivateRoute exact path='/orders' component={Orders} />
          <PrivateRoute exact path='/order' component={Order} />
          <PrivateRoute exact path='/user' component={User} />
          <PrivateRoute exact path='/notify' component={Notify} />
          <PrivateRoute
            exact
            path='/emailConfirmation/:userId'
            component={EmailConfirmation}
          />
        </Switch>
      </div>
    </Router>
  );
=======
import Footer from './Componants/footer/footer.js'
import DownFooter from './Componants/downFooter/downFooter.js'

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
					<Route exact path='/res' component={Res} />
					<Route exact path='/upload' component={Image} />
					<Route exact path='/c' component={Carousel} />
					<Route exact path='/payment' component={payment} />
					<Route exact path='/orders' component={Orders} />
					<Route exact path='/order' component={Order} />
					<Route exact path='/user' component={User} />
					<Route exact path='/notify' component={Notify} />
					<Route
						exact
						path='/emailConfirmation/:userId'
						component={EmailConfirmation}
					/>
				</Switch>
			  {/* <DownFooter /> */}
			</div>
		</Router>
	);
>>>>>>> f08615d1b9e8fda9a99cef060910da5868f7f555
}

export default App;
