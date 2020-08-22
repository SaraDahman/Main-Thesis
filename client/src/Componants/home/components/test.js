import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

import React, { Component } from 'react';

class test extends Component {
  render() {
    return (
      <div>
        <Carousel>
          <div>Item 1</div>
          <div>Item 2</div>
          <div>Item 3</div>
          <div>Item 4</div>
        </Carousel>
        ;
      </div>
    );
  }
}

export default test;
