import React from 'react';
import $ from 'jquery';
import homer from '../Pictures/cartoons/homer.jpg';
import lisa from '../Pictures/cartoons/lisa.png';
import bart from '../Pictures/cartoons/bart.png';
import marge from '../Pictures/cartoons/marge.png';
import maggie from '../Pictures/cartoons/maggie.png';

// $('#sara').click(function () {
//   console.log('helllo there');
//   $('#p').slideUp();
// });
var counter = 1;
function about() {
  return (
    <div style={{ textAlign: 'center', marginTop: '72px' }}>
      <h1>Who Are we ?</h1>
      <br />
      <div style={{ width: '98%', height: '40vh', marginLeft: '20px' }}>
        <div className='ourpics'>
          <h3>Sara</h3>
          <img src={homer} style={{ width: '100%', height: '100%' }} />
        </div>
        <div className='ourpics'>
          <h3>Nasr</h3>
          <img src={lisa} style={{ width: '100%', height: '100%' }} />
        </div>
        <div className='ourpics'>
          <h3>Hourani</h3>
          <img src={marge} style={{ width: '100%', height: '100%' }} />
        </div>
        <div className='ourpics'>
          <h3>shoukri</h3>
          <img src={maggie} style={{ width: '100%', height: '100%' }} />
        </div>
        <div className='ourpics'>
          <h3>Rula</h3>
          <img src={bart} style={{ width: '100%', height: '100%' }} />
        </div>
      </div>
      <br />
      <br />
      <div>
        <p>We are blah blah blah</p>
        <br />
        <h1>What do we offer ?</h1>
        <br />
        <br />
        <div
          style={{
            marginBottom: '50px',
            height: '286px',
          }}
        >
          <div className='offer'>
            <h2
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                backgroundColor: ' rgba(136, 132, 129, 0.3)',
              }}
            >
              For our dear customers
            </h2>
            <p style={{ fontFamily: '"Lucida Console", Courier, monospace' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className='offer'>
            <h2
              style={{
                fontFamily: '"Times New Roman", Times, serif',
                backgroundColor: ' rgba(136, 132, 129, 0.3)',
              }}
            >
              For our dear businesses
            </h2>
            <p style={{ fontFamily: '"Lucida Console", Courier, monospace' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
        <h1
          className='welcome'
          style={{ fontFamily: '"Courier New", Courier, monospace' }}
        >
          Welcome
        </h1>
      </div>
    </div>
  );
}

export default about;
