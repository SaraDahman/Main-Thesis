import React from "react";
// import image from '../Pictures/restaurant.jpg';
import Button from "@material-ui/core/Button";
// import MuiImageSlider from 'mui-image-slider';
// import Carousel from 'react-bootstrap/Carousel';
import "bootstrap/dist/css/bootstrap.min.css";
// import $ from 'jquery';
import Carousel from "../carousel/carousel";

class Landing extends React.Component {
  render() {
    return (
      <div>
        <div className="landingimg"></div>
        <br />
        <div className="landingparagraph">
          <p>Life is too short to buy expensive food</p>
        </div>
        <div className="buttons">
          <Button
            variant="contained"
            color="secondary"
            href="/sign-upBusiness"
            id="btn"
          >
            Join Us as business
          </Button>
          {"   "}
          <Button
            variant="contained"
            color="secondary"
            href="/sign-upClient"
            id="btn"
          >
            Join Us as client
          </Button>
          {"   "}
          <Button variant="contained" color="primary" href="/sign-in" id="btn">
            Sign In
          </Button>
        </div>
        <br />
        <div className="slider">
          <Carousel />
        </div>
      </div>
    );
  }
}

export default Landing;
