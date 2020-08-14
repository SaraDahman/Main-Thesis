import React from "react";
import "./App.css";
import Image from "./Componants/UploadImage";
import SignUp from "./Componants/signUp-business/signUp";
import SignupClient from "./Componants/Sign-up-client/signup-client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./Componants/landing/landing";
import Nav from "./Componants/navbar/navbar";
import SignIn from "./Componants/SignIn/SignIn";
import Res from "./Componants/restaurant/res";
import Carousel from "./Componants/carousel/carousel";
import Menu from "./Componants/menu/menu";
import payment from "./Componants/payment/payout";
import Orders from "./Componants/businessOrders/orders";
import Order from './Componants/ordered/ordered'
import User from "./Componants/userpage/userpage";
import EmailConfirmation from "./Componants/emailConfirmation/emailConfirmation"
function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/menu" component={Menu} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/sign-upClient" component={SignupClient} />
          <Route exact path="/sign-upBusiness" component={SignUp} />
          <Route exact path="/sign-in" component={SignIn} />
          <Route exact path="/res" component={Res} />
          <Route exact path="/upload" component={Image} />
          <Route exact path="/c" component={Carousel} />
          <Route exact path="/payment" component={payment} />
          <Route exact path="/orders" component={Orders} />
          <Route exact path='/order' component={Order} />
          <Route exact path="/user" component={User} />
          <Route exact path="/emailConfirmation/:userId" component={EmailConfirmation} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
