import React from 'react';
import './footer.css';

function Footer() {
  return (
    <div>
    <div className='bg2 p-t-50 p-b-95'>
      <div className='con1'>
        <div className='row1'>
          {/* Contact us About us */}
          <div className=' car31 col-sm-6 col-lg-3'>
            <img
              src='https://freebw.com/templates/yumi/images/icons/logo01.png'
              alt='LOGO'
              style={{
                'marginBottom': '36px',
                'marginTop': '30px'}}
            ></img>
            <p className='s1-txt3'>
               Why waste food? you can start your own business with Us
               you can have the chance to create your own platform to supply your customors with meals,
               and you can be one of our dear clients, come on, give it a shot!
            </p>
          </div>
          <div className="car30">
            <h4 class='m2-txt2 mar'>Contact Us</h4>
            <ul>
              <li class='s1-txt3 flex-w p-b-17'>
                <i class='fa fa-home fs-20 wsize1'>

                </i>
                <span class='wsize2'>Side-menu Gaza Palestine.</span>
              </li>

              <li class='s1-txt3 flex-w p-b-17'>
                <i class='fa fa-clock-o fs-20 wsize1'></i>
                <span class='wsize2'>Tusday-Monday: 9:00am-6:00pm</span>
              </li>

              <li class='s1-txt3 flex-w p-b-17'>
                <i class='fa fa-envelope-o fs-20 wsize1'></i>
                <span class='wsize2'>rulahasna99@gmail.com</span>
              </li>

              <li class='s1-txt3 flex-w p-b-17'>
                <i class='fa fa-phone fs-20 wsize1'></i>
                <span class='wsize2'>Phone: +1-23-456789</span>
              </li>
            </ul>
          </div>
          {/* <div>
          <div>
            <div class="col-sm-6 col-lg-3">
              <div class="wrap-pic-max-h wrap-pic-max-w flex-m hsize1">
                <h4 class="m2-txt2">Subcribe</h4></div><form class="size1 flex-w flex-m bg3">
                  <input class="" type="text" name="mail" placeholder="Email Address"/><button class="size2 bor3 flex-c-m cl0 hov-cl1 trans-04"><i class="fa fa-paper-plane fs-16"></i></button></form><div class="flex-w p-t-25"><a href="#" class="flex-c-m how-social1 trans-04 m-r-10 m-b-10"><i class="fa fa-facebook"></i></a><a href="#" class="flex-c-m how-social1 trans-04 m-r-10 m-b-10">
                    <i class="fa fa-twitter"></i> */}
                    {/* </a><a href="#" class="flex-c-m how-social1 trans-04 m-r-10 m-b-10"> */}
                      {/* <i class="fa fa-google-plus"></i> */}
                      {/* </a><a href="#" class="flex-c-m how-social1 trans-04 m-r-10 m-b-10"> */}
                        {/* <i class="fa fa-instagram"></i> */}
                        {/* </a></div>
                        </div>
                        </div> */}
          {/* </div> */}
        </div>
      </div>
    </div>
    <div class="bg4 s1-txt7 txt-center p-l-15 p-r-15 p-t-28 p-b-28">
          Copyright © Designed by Rula ANd Shoukriii. All rights reserved.
        </div>
    </div>
  );
}

export default Footer;
