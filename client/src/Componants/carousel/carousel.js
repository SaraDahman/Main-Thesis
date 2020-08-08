import React from 'react';
import img from '../Pictures/0.jpg';
import img2 from '../Pictures/la.jpg';
import img3 from '../Pictures/pic.png';

function Carousel() {
  return (
    <div className='wrapper noselect'>
      <span>{/* <a href='#'>Most Viewed</a> */}</span>
      <div className='strip-carousel' id='mostviewed'>
        <div className='arrow-left'>&lsaquo;</div>
        <div className='arrow-right'>&rsaquo;</div>

        <div className='frames'>
          <div className='frame'>
            <img src={img} className='caro' />
          </div>
          <div className='frame'>
            <img src={img2} alt='' className='caro' />
          </div>
          <div className='frame'>
            <img src={img3} alt='' className='caro' />
          </div>
          <div className='frame'>
            <img src={img} alt='' className='caro' />
          </div>
          <div className='frame'>
            <img src={img} alt='' className='caro' />
          </div>

          <div className='frame'></div>
          <div className='frame'></div>
          <div className='frame'></div>
          <div className='frame'></div>
          <div className='frame'></div>

          <div className='frame'></div>
          <div className='frame'></div>
          <div className='frame'></div>
          <div className='frame'></div>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
