import React from 'react';
import './style.css';
import logo from '../home/assets/logo.png';
// import Notification from '../notification/notification'
var status = '';
var token = localStorage.getItem('tokenIdBusiness');
if (token) {
  status = (
    <a
      onClick={() => {
        localStorage.removeItem('tokenIdBusiness');
        localStorage.removeItem('isUserLoggedIn');
        localStorage.removeItem('isBusinessLoggedIn');
      }}
      href='/'
    >
      logout
    </a>
  );
} else {
  status = <a href='/sign-in'>SignIn</a>;
}

class Nav extends React.Component {
  render() {
    return (
      <div className='topnav'>
        <img src={logo} id='logo' />

        <div className='right'>
          {/* <Notification /> */}
          <a href='/'>Home</a>
          <a href='/about-us'>About</a>
          <a href='/contact'>Contact us</a>
          <label>{status}</label>
        </div>
      </div>
    );
  }
}

export default Nav;
