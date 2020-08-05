import React from 'react';
import image from '../Pictures/restaurant.jpg';
import Button from '@material-ui/core/Button';
import MuiImageSlider from 'mui-image-slider';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

class Landing extends React.Component {
  render() {
    return (
      <div>
        <div className='landingimg'></div>
        <div className='landingparagraph'>
          <p>Life is too short to buy expensive food</p>
        </div>
        <div className='buttons'>
          <Button
            variant='contained'
            color='secondary'
            href='/sign-upBusiness'
            width='350px'
          >
            Join Us
          </Button>
          {'   '}
          <Button variant='contained' color='primary' href='/sign-up'>
            Sign In
          </Button>
        </div>
        <br />
        <div className='slider'>
          <Carousel>
            <Carousel.Item>
              <img
                className='d-block w-100'
                src='https://drop.ndtv.com/albums/COOKS/pasta-vegetarian/pastaveg_640x480.jpg'
                alt='First slide'
              />
              <Carousel.Caption>
                <h3>First slide label</h3>
                <p>
                  Nulla vitae elit libero, a pharetra augue mollis interdum.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className='d-block w-100'
                src='holder.js/800x400?text=Second slide&bg=282c34'
                alt='Third slide'
              />

              <Carousel.Caption>
                <h3>Second slide label</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className='d-block w-100'
                src='holder.js/800x400?text=Third slide&bg=20232a'
                alt='Third slide'
              />

              <Carousel.Caption>
                <h3>Third slide label</h3>
                <p>
                  Praesent commodo cursus magna, vel scelerisque nisl
                  consectetur.
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </div>
      </div>
    );
  }
}

export default Landing;
