import React from 'react';
import $ from 'jquery';
import sara from '../Pictures/us/sara.jpg';
import rula from '../Pictures/us/rula.jpg';
import nasr from '../Pictures/us/nasr.jpg';
import hourani from '../Pictures/us/hourani.jpg';
import shoukri from '../Pictures/us/shoukri.jpg';

// $('#sara').click(function () {
//   console.log('helllo there');
//   $('#p').slideUp();
// });
// var counter = 1;
function About() {
  return (
    <div>
      <h1 className='ab4'>Our website is here to offer you food for the cheapest Prices</h1>
      <div className='ab3'>
        <div className='ab1'>
        </div>

      </div>
      <div className='te1'>
        <h3 className='te3'> OUR PERFECT TEAM</h3>
        <div className='row '>
          <div className='col'>
            <div className='content'>
              <div className='content-img'>
                <img src={sara} style={{ width: '100%' }} />
              </div>
              <h3>Sara</h3>
              <p>
                Always stressed, always nervous
              </p>
            </div>{' '}
            <div className='content'>
              <div className='content-img'>
                <img src={rula} style={{ width: '100%' }} />
              </div>
              <h3>Rula</h3>
              <p>
                As sweet as kunafa
              </p>
            </div>{' '}
            <div className='content'>
              <div className='content-img'>
                <img src={hourani} style={{ width: '100%' }} />
              </div>
              <h3>Hourani</h3>
              <p>
                Really ?
              </p>
            </div>{' '}
            <div className='content'>
              <div className='content-img'>
                <img src={nasr} style={{ width: '100%' }} />
              </div>
              <h3>Nasr</h3>
              <p>
                The creator of stripe
              </p>
            </div>{' '}
            <div className='content'>
              <div className='content-img'>
                <img src={shoukri} style={{ width: '100%' }} />
              </div>
              <h3>Shoukri</h3>
              <p>
                Mapist
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
