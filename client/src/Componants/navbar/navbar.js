import React from 'react';
import './style.css';
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
  status = null;
}
class Nav extends React.Component {
  render() {
    return (
      <div className='topnav'>
        <a href='/'>Home</a>
        <div className='right'>
          {/* <Notification /> */}
          <a href='/About'>About</a>
          <a href='/contact'>Contact us</a>
          <label>{status}</label>
        </div>
      </div>
    );
  }
}

export default Nav;
