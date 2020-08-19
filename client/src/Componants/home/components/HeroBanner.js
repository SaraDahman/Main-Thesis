import React from 'react';
import img1 from '../assets/homee.png';
import Buttom from '../buttom.js';

function HeroBanner() {
  return (
    <section id='home'>
      <div className='container'>
        <div className='home-text'>
          <div className='section-text__subtitle'></div>
          <div className='section-text__title-big'>
            Eat out on a budget and protect the planet
          </div>
          <div className='section-text__body'>
            Rescue unsold meals, always 50% off
          </div>
          {/* <a href='#download' className='download-btn'>
            Join Us
          </a> */}
          <Buttom />
        </div>

        <div className='section-image'>
          <img src={img1} alt='app preview' />
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
