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
        localStorage.removeItem('isUserLoggedInHome');
        localStorage.removeItem('isBusinessLoggedInnHome');
      }}
      href='/'
    >
      logout
    </a>
  );
} else {
  status = <a href='/sign-in'>SignIn</a>;
}

var check =
  localStorage.getItem('isUserLoggedInHome') ||
  localStorage.getItem('isBusinessLoggedInnHome');
var home;

if (check == 'user') {
  home = '/userpage';
} else if (check == 'Business') {
  home = '/res';
} else {
  home = '/';
}

class Nav extends React.Component {
  render() {
    return (
      <div className='topnav'>
        <img src={logo} id='logo' />

        <div className='right'>
          {/* <Notification /> */}
          <a href={home}>Home</a>
          <a href='/about-us'>About</a>
          <a href='#Footer'>Contact us</a>
          <label>{status}</label>
        </div>
      </div>
    );
  }
}

export default Nav;
