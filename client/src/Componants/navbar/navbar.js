import React from 'react';
import './style.css';

class Nav extends React.Component {
  render() {
    return (
      <div className="topnav">
        <a  href="/">Home</a>
        <div className="right">
        <a href="/About">About</a>
        <a href="/contact">Contact us</a>
        </div>
      </div>
    );
  }
}

export default Nav;
