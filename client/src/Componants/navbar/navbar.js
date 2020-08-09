import React from "react";
import "./style.css";

var status = "";
var token = localStorage.getItem("tokenIdBusiness");
if (token) {
  status = "logout";
} else {
  status = null;
}
class Nav extends React.Component {
  render() {
    return (
      <div className="topnav">
        <a href="/">Home</a>
        <div className="right">
          <a href="/About">About</a>
          <a href="/contact">Contact us</a>
          <a
            onClick={() => {
              localStorage.removeItem("tokenIdBusiness");
            }}
            href="/"
          >
            {status}
          </a>
        </div>
      </div>
    );
  }
}

export default Nav;
