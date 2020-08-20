import React from 'react';
import './footer.css';
import logo from '../home/assets/logo.png';

function Footer() {
  return (
    <div>
      <div className='bg2 p-t-50 p-b-95'>
        <div className='con1'>
          <div className='row1'>
            <div className=' car31 col-sm-6 col-lg-3'>
              <img
                src={logo}
                alt='LOGO'
                style={{
                  marginBottom: '36px',
                  marginTop: '30px',
                  width: '50%',
                }}
              ></img>
              <p className='s1-txt3'>
                Why waste food? you can start your own business with Us you can
                have the chance to create your own platform to supply your
                customors with meals, and you can be one of our dear clients,
                come on, give it a shot!
              </p>
            </div>
            <div className='car30'>
              <h4 class='m2-txt2 mar'>Contact Us</h4>
              <div className='ContactUs'>
                <p>Side-menu Gaza Palestine.</p>
                <p>Tusday-Monday: 9:00am-6:00pm</p>
                <p>rulahasna99@gmail.com</p>
                <p>Phone: +970-0599-214474</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class='bg4 s1-txt7 txt-center p-l-15 p-r-15 p-t-28 p-b-28'>
        Copyright © Designed by Rula ANd Shoukriii. All rights reserved.
      </div>
    </div>
  );
}

export default Footer;
